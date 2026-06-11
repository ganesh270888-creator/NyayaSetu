"use client";

import { useState } from "react";
import { Check, Crown, Zap } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/components/language-provider";
import { PLANS } from "@/lib/razorpay";

declare global {
  interface Window {
    Razorpay: new (options: Record<string, unknown>) => { open: () => void };
  }
}

export default function PricingPage() {
  const { locale } = useLanguage();
  const [loading, setLoading] = useState<string | null>(null);

  async function handleSubscribe(planId: string) {
    if (planId === "free" || planId === "enterprise") return;
    setLoading(planId);

    try {
      const res = await fetch("/api/payments/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planId }),
      });

      if (!res.ok) throw new Error("Order creation failed");
      const { orderId, amount, currency, keyId } = await res.json();

      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => {
        const options = {
          key: keyId,
          amount,
          currency,
          name: "NyayaSetu",
          description: `${planId.charAt(0).toUpperCase() + planId.slice(1)} Plan`,
          order_id: orderId,
          handler: async (response: { razorpay_order_id: string; razorpay_payment_id: string; razorpay_signature: string }) => {
            const verifyRes = await fetch("/api/payments/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(response),
            });
            if (verifyRes.ok) {
              alert(locale === "hi" ? "भुगतान सफल! आपका प्लान सक्रिय हो गया।" : "Payment successful! Your plan is now active.");
            }
          },
          prefill: {},
          theme: { color: "#2563eb" },
        };
        const rzp = new window.Razorpay(options);
        rzp.open();
      };
      document.body.appendChild(script);
    } catch (error) {
      console.error("Payment error:", error);
      alert(locale === "hi" ? "भुगतान में त्रुटि" : "Payment error. Please try again.");
    } finally {
      setLoading(null);
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold flex items-center justify-center gap-3">
          <Crown className="h-8 w-8 text-primary" />
          {locale === "hi" ? "प्लान चुनें" : "Choose Your Plan"}
        </h1>
        <p className="text-muted-foreground mt-2">
          {locale === "hi"
            ? "अपने व्यवसाय के लिए सही प्लान चुनें"
            : "Select the right plan for your business"}
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {PLANS.map((plan) => (
          <Card
            key={plan.id}
            className={`relative ${
              "popular" in plan && plan.popular ? "border-primary shadow-lg" : ""
            }`}
          >
            {"popular" in plan && plan.popular && (
              <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary">
                {locale === "hi" ? "सबसे लोकप्रिय" : "Most Popular"}
              </Badge>
            )}
            <CardHeader className="text-center">
              <CardTitle>{locale === "hi" ? plan.nameHi : plan.name}</CardTitle>
              <CardDescription>
                <span className="text-3xl font-bold text-foreground">
                  {plan.priceLabel}
                </span>
                {plan.price > 0 && (
                  <span className="text-sm">/{locale === "hi" ? "महीना" : "month"}</span>
                )}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <Check className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                    <span>{locale === "hi" ? feature.hi : feature.en}</span>
                  </li>
                ))}
              </ul>
              {plan.id === "free" ? (
                <Button variant="outline" className="w-full" disabled>
                  {locale === "hi" ? "वर्तमान प्लान" : "Current Plan"}
                </Button>
              ) : plan.id === "enterprise" ? (
                <Button variant="outline" className="w-full">
                  {locale === "hi" ? "संपर्क करें" : "Contact Us"}
                </Button>
              ) : (
                <Button
                  className="w-full"
                  onClick={() => handleSubscribe(plan.id)}
                  disabled={loading === plan.id}
                >
                  <Zap className="h-4 w-4 mr-1" />
                  {loading === plan.id
                    ? locale === "hi" ? "प्रोसेसिंग..." : "Processing..."
                    : locale === "hi" ? "अभी शुरू करें" : "Get Started"}
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center text-sm text-muted-foreground">
        <p>{locale === "hi" ? "सभी भुगतान Razorpay द्वारा सुरक्षित" : "All payments secured by Razorpay"}</p>
        <p className="mt-1">{locale === "hi" ? "कभी भी रद्द करें, कोई छिपी फीस नहीं" : "Cancel anytime, no hidden fees"}</p>
      </div>
    </div>
  );
}

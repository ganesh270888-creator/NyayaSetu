"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, Crown, Zap, Scale, ArrowLeft } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

declare global {
  interface Window {
    Razorpay: new (options: Record<string, unknown>) => { open: () => void };
  }
}

const PLANS = [
  {
    id: "free",
    name: "Free",
    nameHi: "मुफ्त",
    price: "₹0",
    priceAmount: 0,
    features: [
      { en: "3 contract scans/month", hi: "3 अनुबंध स्कैन/महीना" },
      { en: "2 legal notices/month", hi: "2 कानूनी नोटिस/महीना" },
      { en: "1 GST playbook/month", hi: "1 GST प्लेबुक/महीना" },
      { en: "Basic email support", hi: "बेसिक ईमेल सपोर्ट" },
    ],
  },
  {
    id: "starter",
    name: "Starter",
    nameHi: "स्टार्टर",
    price: "₹999",
    priceAmount: 99900,
    features: [
      { en: "25 contract scans/month", hi: "25 अनुबंध स्कैन/महीना" },
      { en: "15 legal notices/month", hi: "15 कानूनी नोटिस/महीना" },
      { en: "10 GST playbooks/month", hi: "10 GST प्लेबुक/महीना" },
      { en: "10 recovery plans/month", hi: "10 वसूली योजनाएं/महीना" },
      { en: "PDF export", hi: "PDF डाउनलोड" },
      { en: "Priority support", hi: "प्राथमिकता सपोर्ट" },
    ],
  },
  {
    id: "professional",
    name: "Professional",
    nameHi: "प्रोफेशनल",
    price: "₹2,499",
    priceAmount: 249900,
    popular: true,
    features: [
      { en: "Unlimited contract scans", hi: "असीमित अनुबंध स्कैन" },
      { en: "Unlimited legal notices", hi: "असीमित कानूनी नोटिस" },
      { en: "Unlimited GST playbooks", hi: "असीमित GST प्लेबुक" },
      { en: "Unlimited recovery plans", hi: "असीमित वसूली योजनाएं" },
      { en: "Database save & history", hi: "डेटाबेस सेव और इतिहास" },
      { en: "PDF export", hi: "PDF डाउनलोड" },
      { en: "Dedicated support", hi: "समर्पित सपोर्ट" },
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    nameHi: "एंटरप्राइज़",
    price: "Custom",
    priceAmount: 0,
    features: [
      { en: "Everything in Professional", hi: "प्रोफेशनल की सभी सुविधाएं" },
      { en: "Multi-user access", hi: "बहु-उपयोगकर्ता एक्सेस" },
      { en: "Custom templates", hi: "कस्टम टेम्पलेट" },
      { en: "API access", hi: "API एक्सेस" },
      { en: "SLA guarantee", hi: "SLA गारंटी" },
    ],
  },
];

export default function PricingPage() {
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
              alert("Payment successful! Your plan is now active.");
            }
          },
          theme: { color: "#2563eb" },
        };
        const rzp = new window.Razorpay(options);
        rzp.open();
      };
      document.body.appendChild(script);
    } catch {
      alert("Payment error. Please try again.");
    } finally {
      setLoading(null);
    }
  }

  return (
    <div className="min-h-screen">
      <header className="border-b">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Scale className="h-6 w-6 text-primary" />
            <span className="font-bold">NyayaSetu</span>
          </Link>
          <Link href="/"><Button variant="ghost" size="sm"><ArrowLeft className="h-4 w-4 mr-1" /> Back</Button></Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold flex items-center justify-center gap-3">
            <Crown className="h-8 w-8 text-primary" />
            Choose Your Plan — प्लान चुनें
          </h1>
          <p className="text-muted-foreground mt-2">
            At 1/10th the cost of a lawyer — वकील की फीस का 1/10
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PLANS.map((plan) => (
            <Card key={plan.id} className={`relative ${plan.popular ? "border-primary shadow-lg" : ""}`}>
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary">
                  Most Popular
                </Badge>
              )}
              <CardHeader className="text-center">
                <CardTitle>{plan.nameHi} — {plan.name}</CardTitle>
                <CardDescription>
                  <span className="text-3xl font-bold text-foreground">{plan.price}</span>
                  {plan.priceAmount > 0 && <span className="text-sm">/month</span>}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <Check className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                      <span>{feature.hi}</span>
                    </li>
                  ))}
                </ul>
                {plan.id === "free" ? (
                  <Link href="/register">
                    <Button variant="outline" className="w-full">Start Free</Button>
                  </Link>
                ) : plan.id === "enterprise" ? (
                  <Link href="/contact">
                    <Button variant="outline" className="w-full">Contact Us</Button>
                  </Link>
                ) : (
                  <Button
                    className="w-full"
                    onClick={() => handleSubscribe(plan.id)}
                    disabled={loading === plan.id}
                  >
                    <Zap className="h-4 w-4 mr-1" />
                    {loading === plan.id ? "Processing..." : "Get Started"}
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center text-sm text-muted-foreground mt-8 space-y-1">
          <p>All payments secured by Razorpay. Cancel anytime, no hidden fees.</p>
          <p>7-day money-back guarantee on all paid plans.</p>
        </div>
      </main>
    </div>
  );
}

"use client";

import { useState } from "react";
import { Landmark, Clock, FileText, IndianRupee, MapPin } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLanguage } from "@/components/language-provider";
import { INDIAN_STATES } from "@/lib/constants";
import type { RecoveryPlan } from "@/lib/ai";

export default function RecoveryPage() {
  const { tr, locale, aiLang } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<RecoveryPlan | null>(null);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    debtorName: "",
    amount: "",
    securedOrUnsecured: "",
    state: "",
    facts: "",
  });

  function updateForm(key: string, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleGenerate() {
    if (!form.debtorName || !form.amount || !form.facts) return;
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch("/api/recovery/plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, language: aiLang }),
      });
      if (!res.ok) throw new Error("Generation failed");
      setResult(await res.json());
    } catch {
      setError(tr.common.error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <Landmark className="h-8 w-8 text-primary" />
          {tr.recovery.title}
        </h1>
        <p className="text-muted-foreground mt-1">{tr.recovery.subtitle}</p>
      </div>

      {/* Form */}
      <Card>
        <CardHeader>
          <CardTitle>
            {locale === "hi" ? "वसूली विवरण" : "Recovery Details"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label>{tr.recovery.debtorName}</Label>
              <Input
                value={form.debtorName}
                onChange={(e) => updateForm("debtorName", e.target.value)}
                placeholder={locale === "hi" ? "व्यक्ति/कंपनी का नाम" : "Person/Company name"}
              />
            </div>

            <div>
              <Label>{tr.recovery.amount}</Label>
              <Input
                value={form.amount}
                onChange={(e) => updateForm("amount", e.target.value)}
                placeholder="₹"
                type="text"
              />
            </div>

            <div>
              <Label>{tr.recovery.type}</Label>
              <Select onValueChange={(v) => updateForm("securedOrUnsecured", v as string)}>
                <SelectTrigger>
                  <SelectValue placeholder={locale === "hi" ? "प्रकार चुनें" : "Select type"} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="secured">
                    {locale === "hi" ? tr.recovery.secured : "Secured (with collateral)"}
                  </SelectItem>
                  <SelectItem value="unsecured">
                    {locale === "hi" ? tr.recovery.unsecured : "Unsecured"}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>{tr.recovery.state}</Label>
              <Select onValueChange={(v) => updateForm("state", v as string)}>
                <SelectTrigger>
                  <SelectValue placeholder={locale === "hi" ? "राज्य चुनें" : "Select state"} />
                </SelectTrigger>
                <SelectContent>
                  {INDIAN_STATES.map((s) => (
                    <SelectItem key={s} value={s}>{s}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label>{tr.recovery.facts}</Label>
            <Textarea
              value={form.facts}
              onChange={(e) => updateForm("facts", e.target.value)}
              placeholder={
                locale === "hi"
                  ? "क्या हुआ? कब से बकाया है? क्या कोई समझौता या अनुबंध था? विस्तार से बताएं..."
                  : "What happened? How long overdue? Was there an agreement? Explain in detail..."
              }
              className="min-h-[120px]"
            />
          </div>

          <Button onClick={handleGenerate} disabled={loading} className="w-full">
            {loading ? tr.recovery.generating : tr.recovery.generate}
          </Button>
          {error && <p className="text-destructive text-sm mt-2">{error}</p>}
        </CardContent>
      </Card>

      {/* Result */}
      {result && (
        <div className="space-y-4">
          {/* Summary Cards */}
          <div className="grid md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <Landmark className="h-6 w-6 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">{tr.recovery.mechanism}</p>
                    <p className="font-semibold text-sm">{result.recommendedMechanism}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <MapPin className="h-6 w-6 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">{tr.recovery.forum}</p>
                    <p className="font-semibold text-sm">{result.forum}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <Clock className="h-6 w-6 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">{tr.recovery.timeline}</p>
                    <p className="font-semibold text-sm">{result.estimatedTimeline}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Steps */}
          <Card>
            <CardHeader>
              <CardTitle>{tr.recovery.plan}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {result.steps.map((step) => (
                  <div key={step.step} className="flex gap-4 items-start">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                      {step.step}
                    </div>
                    <div className="flex-1 border rounded-lg p-4">
                      <p className="font-medium text-sm">{step.action}</p>
                      <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {step.timeline}
                        </span>
                        <span className="flex items-center gap-1">
                          <IndianRupee className="h-3 w-3" />
                          {step.cost}
                        </span>
                      </div>
                      {step.documents.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-1">
                          {step.documents.map((doc, i) => (
                            <Badge key={i} variant="outline" className="text-xs">
                              <FileText className="h-3 w-3 mr-1" />
                              {doc}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {result.draftNotice && (
            <Card>
              <CardHeader>
                <CardTitle>
                  {locale === "hi" ? "मांग नोटिस का मसौदा" : "Draft Demand Notice"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-muted p-4 rounded-lg whitespace-pre-wrap text-sm font-mono leading-relaxed max-h-[400px] overflow-y-auto">
                  {result.draftNotice}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}

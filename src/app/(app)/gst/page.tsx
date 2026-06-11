"use client";

import { useState } from "react";
import { Receipt, FileCheck, Clock, FileText } from "lucide-react";
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
import { GST_NOTICE_TYPES, GST_SECTIONS, DISPUTE_STAGES } from "@/lib/constants";
import type { DisputePlaybook } from "@/lib/ai";

export default function GstPage() {
  const { tr, locale, aiLang } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<DisputePlaybook | null>(null);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    gstin: "",
    noticeType: "",
    section: "",
    amount: "",
    stage: "",
    facts: "",
  });

  function updateForm(key: string, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleGenerate() {
    if (!form.gstin || !form.noticeType || !form.facts) return;
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch("/api/gst/playbook", {
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
          <Receipt className="h-8 w-8 text-primary" />
          {tr.gst.title}
        </h1>
        <p className="text-muted-foreground mt-1">{tr.gst.subtitle}</p>
      </div>

      {/* Input Form */}
      <Card>
        <CardHeader>
          <CardTitle>
            {locale === "hi" ? "विवाद विवरण" : "Dispute Details"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label>{tr.gst.gstin}</Label>
              <Input
                value={form.gstin}
                onChange={(e) => updateForm("gstin", e.target.value.toUpperCase())}
                placeholder="22AAAAA0000A1Z5"
                maxLength={15}
              />
            </div>

            <div>
              <Label>{tr.gst.noticeType}</Label>
              <Select onValueChange={(v) => updateForm("noticeType", v as string)}>
                <SelectTrigger>
                  <SelectValue placeholder={locale === "hi" ? "प्रकार चुनें" : "Select type"} />
                </SelectTrigger>
                <SelectContent>
                  {GST_NOTICE_TYPES.map((nt) => (
                    <SelectItem key={nt.value} value={nt.value}>
                      {locale === "hi" ? nt.labelHi : nt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>{tr.gst.section}</Label>
              <Select onValueChange={(v) => updateForm("section", v as string)}>
                <SelectTrigger>
                  <SelectValue placeholder={locale === "hi" ? "धारा चुनें" : "Select section"} />
                </SelectTrigger>
                <SelectContent>
                  {GST_SECTIONS.map((s) => (
                    <SelectItem key={s} value={s}>{s}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>{tr.gst.amount}</Label>
              <Input
                value={form.amount}
                onChange={(e) => updateForm("amount", e.target.value)}
                placeholder="₹"
                type="text"
              />
            </div>

            <div>
              <Label>{tr.gst.stage}</Label>
              <Select onValueChange={(v) => updateForm("stage", v as string)}>
                <SelectTrigger>
                  <SelectValue placeholder={locale === "hi" ? "चरण चुनें" : "Select stage"} />
                </SelectTrigger>
                <SelectContent>
                  {DISPUTE_STAGES.map((s) => (
                    <SelectItem key={s.value} value={s.value}>
                      {locale === "hi" ? s.labelHi : s.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="mt-4">
            <Label>{tr.gst.facts}</Label>
            <Textarea
              value={form.facts}
              onChange={(e) => updateForm("facts", e.target.value)}
              placeholder={
                locale === "hi"
                  ? "नोटिस में क्या लिखा है? आपकी स्थिति क्या है? विस्तार से बताएं..."
                  : "What does the notice say? What is your situation? Explain in detail..."
              }
              className="min-h-[120px]"
            />
          </div>

          <Button onClick={handleGenerate} disabled={loading} className="mt-4 w-full">
            {loading ? tr.gst.generating : tr.gst.generate}
          </Button>
          {error && <p className="text-destructive text-sm mt-2">{error}</p>}
        </CardContent>
      </Card>

      {/* Playbook Result */}
      {result && (
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileCheck className="h-5 w-5 text-primary" />
                {tr.gst.playbook}
              </CardTitle>
              <CardDescription>
                {locale === "hi" ? "वर्तमान चरण:" : "Current stage:"}{" "}
                <Badge variant="secondary">{result.currentStage}</Badge>
              </CardDescription>
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
                          {step.deadline}
                        </span>
                      </div>
                      {step.documents.length > 0 && (
                        <div className="mt-2">
                          <p className="text-xs font-medium mb-1">{tr.gst.documents}:</p>
                          <div className="flex flex-wrap gap-1">
                            {step.documents.map((doc, i) => (
                              <Badge key={i} variant="outline" className="text-xs">
                                <FileText className="h-3 w-3 mr-1" />
                                {doc}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                      {step.notes && (
                        <p className="text-xs text-muted-foreground mt-2 italic">{step.notes}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {result.draftReply && (
            <Card>
              <CardHeader>
                <CardTitle>{tr.gst.draftReply}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-muted p-4 rounded-lg whitespace-pre-wrap text-sm font-mono leading-relaxed max-h-[400px] overflow-y-auto">
                  {result.draftReply}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}

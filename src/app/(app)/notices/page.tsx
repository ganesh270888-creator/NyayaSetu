"use client";

import { useState } from "react";
import { FileText, Copy, Check } from "lucide-react";
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
import { NOTICE_TYPES } from "@/lib/constants";
import type { NoticeResult } from "@/lib/ai";

export default function NoticesPage() {
  const { tr, locale, aiLang } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<NoticeResult | null>(null);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    noticeType: "",
    senderName: "",
    senderAddress: "",
    recipientName: "",
    recipientAddress: "",
    facts: "",
    reliefSought: "",
    amount: "",
  });

  function updateForm(key: string, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleDraft() {
    if (!form.noticeType || !form.senderName || !form.recipientName || !form.facts) return;
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch("/api/notices/draft", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, language: aiLang }),
      });
      if (!res.ok) throw new Error("Draft failed");
      setResult(await res.json());
    } catch {
      setError(tr.common.error);
    } finally {
      setLoading(false);
    }
  }

  function copyNotice() {
    if (!result) return;
    navigator.clipboard.writeText(result.notice);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <FileText className="h-8 w-8 text-primary" />
          {tr.notices.title}
        </h1>
        <p className="text-muted-foreground mt-1">{tr.notices.subtitle}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Form */}
        <Card>
          <CardHeader>
            <CardTitle>{locale === "hi" ? "नोटिस विवरण" : "Notice Details"}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>{tr.notices.type}</Label>
              <Select onValueChange={(v) => updateForm("noticeType", v as string)}>
                <SelectTrigger>
                  <SelectValue
                    placeholder={locale === "hi" ? "नोटिस का प्रकार चुनें" : "Select notice type"}
                  />
                </SelectTrigger>
                <SelectContent>
                  {NOTICE_TYPES.map((nt) => (
                    <SelectItem key={nt.value} value={nt.value}>
                      {locale === "hi" ? nt.labelHi : nt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="border rounded-lg p-4 space-y-3">
              <p className="text-sm font-medium">{tr.notices.sender}</p>
              <div>
                <Label>{tr.notices.name}</Label>
                <Input
                  value={form.senderName}
                  onChange={(e) => updateForm("senderName", e.target.value)}
                  placeholder={locale === "hi" ? "आपका नाम" : "Your name"}
                />
              </div>
              <div>
                <Label>{tr.notices.address}</Label>
                <Textarea
                  value={form.senderAddress}
                  onChange={(e) => updateForm("senderAddress", e.target.value)}
                  placeholder={locale === "hi" ? "आपका पूरा पता" : "Your full address"}
                  className="min-h-[60px]"
                />
              </div>
            </div>

            <div className="border rounded-lg p-4 space-y-3">
              <p className="text-sm font-medium">{tr.notices.recipient}</p>
              <div>
                <Label>{tr.notices.name}</Label>
                <Input
                  value={form.recipientName}
                  onChange={(e) => updateForm("recipientName", e.target.value)}
                  placeholder={locale === "hi" ? "प्राप्तकर्ता का नाम" : "Recipient name"}
                />
              </div>
              <div>
                <Label>{tr.notices.address}</Label>
                <Textarea
                  value={form.recipientAddress}
                  onChange={(e) => updateForm("recipientAddress", e.target.value)}
                  placeholder={locale === "hi" ? "प्राप्तकर्ता का पूरा पता" : "Recipient address"}
                  className="min-h-[60px]"
                />
              </div>
            </div>

            <div>
              <Label>{tr.notices.facts}</Label>
              <Textarea
                value={form.facts}
                onChange={(e) => updateForm("facts", e.target.value)}
                placeholder={
                  locale === "hi"
                    ? "क्या हुआ है, सब कुछ विस्तार से बताएं..."
                    : "Describe what happened in detail..."
                }
                className="min-h-[100px]"
              />
            </div>

            <div>
              <Label>{tr.notices.relief}</Label>
              <Input
                value={form.reliefSought}
                onChange={(e) => updateForm("reliefSought", e.target.value)}
                placeholder={locale === "hi" ? "आप क्या चाहते हैं?" : "What do you want?"}
              />
            </div>

            <div>
              <Label>{tr.notices.amount}</Label>
              <Input
                value={form.amount}
                onChange={(e) => updateForm("amount", e.target.value)}
                placeholder="₹"
                type="text"
              />
            </div>

            <Button onClick={handleDraft} disabled={loading} className="w-full">
              {loading ? tr.notices.drafting : tr.notices.draft}
            </Button>
            {error && <p className="text-destructive text-sm">{error}</p>}
          </CardContent>
        </Card>

        {/* Result */}
        <div className="space-y-4">
          {result ? (
            <>
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>{tr.notices.result}</CardTitle>
                    <Button variant="outline" size="sm" onClick={copyNotice}>
                      {copied ? (
                        <Check className="h-4 w-4 mr-1" />
                      ) : (
                        <Copy className="h-4 w-4 mr-1" />
                      )}
                      {copied
                        ? locale === "hi" ? "कॉपी हो गया" : "Copied"
                        : tr.notices.copy}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted p-4 rounded-lg whitespace-pre-wrap text-sm font-mono leading-relaxed max-h-[500px] overflow-y-auto">
                    {result.notice}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{tr.notices.legalBasis}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {result.legalBasis.map((basis, i) => (
                      <Badge key={i} variant="secondary">{basis}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{tr.notices.nextSteps}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ol className="list-decimal list-inside space-y-2 text-sm">
                    {result.nextSteps.map((step, i) => (
                      <li key={i} className="text-muted-foreground">{step}</li>
                    ))}
                  </ol>
                </CardContent>
              </Card>
            </>
          ) : (
            <Card className="h-full flex items-center justify-center min-h-[400px]">
              <CardContent className="text-center text-muted-foreground">
                <FileText className="h-16 w-16 mx-auto mb-4 opacity-20" />
                <p className="text-lg font-medium">
                  {locale === "hi"
                    ? "नोटिस यहां दिखेगा"
                    : "Notice will appear here"}
                </p>
                <p className="text-sm mt-1">
                  {locale === "hi"
                    ? "बाईं ओर फॉर्म भरें और 'नोटिस बनाएं' दबाएं"
                    : "Fill the form and click 'Draft Notice'"}
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { FileSearch, Upload, AlertTriangle, CheckCircle, XCircle, Shield } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/components/language-provider";
import { RISK_COLORS } from "@/lib/constants";
import type { ContractAnalysis } from "@/lib/ai";

export default function ContractsPage() {
  const { tr, locale, aiLang } = useLanguage();
  const [contractText, setContractText] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ContractAnalysis | null>(null);
  const [error, setError] = useState("");

  async function handleAnalyze() {
    if (!contractText.trim()) return;
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch("/api/contracts/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contractText, language: aiLang }),
      });

      if (!res.ok) throw new Error("Analysis failed");
      const data = await res.json();
      setResult(data);
    } catch {
      setError(tr.common.error);
    } finally {
      setLoading(false);
    }
  }

  const riskIcon = (severity: string) => {
    if (severity === "CRITICAL" || severity === "HIGH") return <XCircle className="h-4 w-4" />;
    if (severity === "MEDIUM") return <AlertTriangle className="h-4 w-4" />;
    return <CheckCircle className="h-4 w-4" />;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <FileSearch className="h-8 w-8 text-primary" />
          {tr.contracts.title}
        </h1>
        <p className="text-muted-foreground mt-1">{tr.contracts.subtitle}</p>
      </div>

      {/* Input Section */}
      <Card>
        <CardHeader>
          <CardTitle>{tr.contracts.paste}</CardTitle>
          <CardDescription>
            {locale === "hi"
              ? "अनुबंध का पूरा टेक्स्ट नीचे पेस्ट करें"
              : "Paste the full contract text below"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder={
              locale === "hi"
                ? "अनुबंध का टेक्स्ट यहां पेस्ट करें..."
                : "Paste contract text here..."
            }
            className="min-h-[200px] font-mono text-sm"
            value={contractText}
            onChange={(e) => setContractText(e.target.value)}
          />
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              {contractText.length > 0
                ? `${contractText.split(/\s+/).length} ${locale === "hi" ? "शब्द" : "words"}`
                : ""}
            </p>
            <Button onClick={handleAnalyze} disabled={loading || !contractText.trim()}>
              {loading ? (
                <>
                  <span className="animate-spin mr-2">⏳</span>
                  {tr.contracts.analyzing}
                </>
              ) : (
                <>
                  <Shield className="h-4 w-4 mr-2" />
                  {tr.contracts.analyze}
                </>
              )}
            </Button>
          </div>
          {error && (
            <p className="text-destructive text-sm">{error}</p>
          )}
        </CardContent>
      </Card>

      {/* Results */}
      {result && (
        <div className="space-y-6">
          {/* Risk Score */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{tr.contracts.riskScore}</p>
                  <p className="text-4xl font-bold">{result.riskScore}/100</p>
                </div>
                <Badge
                  className={`text-lg px-4 py-2 ${RISK_COLORS[result.overallRisk].bg} ${RISK_COLORS[result.overallRisk].text}`}
                  variant="outline"
                >
                  {result.overallRisk}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Summary */}
          <Card>
            <CardHeader>
              <CardTitle>{tr.contracts.summary}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed">{result.summary}</p>
            </CardContent>
          </Card>

          {/* Detailed Analysis Tabs */}
          <Tabs defaultValue="risks">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="risks">
                {tr.contracts.risks} ({result.risks.length})
              </TabsTrigger>
              <TabsTrigger value="missing">
                {tr.contracts.missing} ({result.missingProtections.length})
              </TabsTrigger>
              <TabsTrigger value="compliance">
                {tr.contracts.compliance} ({result.complianceIssues.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="risks" className="space-y-3 mt-4">
              {result.risks.map((risk, i) => (
                <Card key={i}>
                  <CardContent className="pt-4">
                    <div className="flex items-start gap-3">
                      <div className={RISK_COLORS[risk.severity].text}>
                        {riskIcon(risk.severity)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge
                            variant="outline"
                            className={`${RISK_COLORS[risk.severity].bg} ${RISK_COLORS[risk.severity].text} text-xs`}
                          >
                            {risk.severity}
                          </Badge>
                        </div>
                        <p className="font-medium text-sm mb-1">{risk.clause}</p>
                        <p className="text-sm text-muted-foreground mb-2">{risk.risk}</p>
                        <div className="bg-muted p-3 rounded-md">
                          <p className="text-xs font-medium mb-1">{tr.contracts.recommendation}:</p>
                          <p className="text-xs text-muted-foreground">{risk.recommendation}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              {result.risks.length === 0 && (
                <p className="text-center text-muted-foreground py-8">
                  {locale === "hi" ? "कोई जोखिम नहीं मिला" : "No risks found"}
                </p>
              )}
            </TabsContent>

            <TabsContent value="missing" className="space-y-3 mt-4">
              {result.missingProtections.map((item, i) => (
                <Card key={i}>
                  <CardContent className="pt-4">
                    <p className="font-medium text-sm mb-1">{item.protection}</p>
                    <p className="text-sm text-muted-foreground mb-2">{item.importance}</p>
                    <div className="bg-muted p-3 rounded-md">
                      <p className="text-xs font-medium mb-1">
                        {locale === "hi" ? "सुझाया गया खंड:" : "Suggested clause:"}
                      </p>
                      <p className="text-xs text-muted-foreground font-mono">{item.suggestedClause}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="compliance" className="space-y-3 mt-4">
              {result.complianceIssues.map((issue, i) => (
                <Card key={i}>
                  <CardContent className="pt-4">
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-orange-500 mt-0.5 shrink-0" />
                      <p className="text-sm">{issue}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
              {result.complianceIssues.length === 0 && (
                <p className="text-center text-muted-foreground py-8">
                  <CheckCircle className="h-8 w-8 mx-auto mb-2 text-green-500" />
                  {locale === "hi" ? "कोई अनुपालन समस्या नहीं" : "No compliance issues found"}
                </p>
              )}
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  );
}

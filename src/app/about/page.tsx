import Link from "next/link";
import { Scale, ArrowLeft, Users, Target, Shield, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <header className="border-b">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Scale className="h-6 w-6 text-primary" />
            <span className="font-bold">NyayaSetu</span>
          </Link>
          <Link href="/">
            <Button variant="ghost" size="sm"><ArrowLeft className="h-4 w-4 mr-1" /> Back</Button>
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-2">About NyayaSetu — न्यायसेतु</h1>
        <p className="text-xl text-muted-foreground mb-8">Building the bridge between Indian MSMEs and legal justice.</p>

        <div className="prose prose-neutral max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-semibold flex items-center gap-2"><Target className="h-6 w-6 text-primary" /> Our Mission</h2>
            <p className="text-muted-foreground">
              India has 63 million MSMEs — the backbone of the economy. Yet 70% of them face legal
              disputes they cannot afford to resolve. Hiring a lawyer costs ₹10,000–₹50,000 per issue.
              Most MSMEs simply give up.
            </p>
            <p className="text-muted-foreground">
              NyayaSetu (न्यायसेतु — &ldquo;Bridge to Justice&rdquo;) uses AI to make legal intelligence
              accessible, affordable, and available in Hindi. We believe no business should fail because
              it couldn&apos;t afford legal help.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold flex items-center gap-2"><Shield className="h-6 w-6 text-primary" /> What We Do</h2>
            <div className="grid md:grid-cols-2 gap-4 mt-4">
              {[
                { title: "Contract Risk Scanner", desc: "Upload contracts → get instant risk analysis, missing clauses, and recommendations in plain Hindi or English." },
                { title: "Legal Notice Engine", desc: "Draft demand notices, Sec 138 cheque bounce notices, eviction notices — legally formatted and ready to send." },
                { title: "GST Dispute Playbooks", desc: "Step-by-step guidance for responding to GST show cause notices, with draft replies and deadlines." },
                { title: "Credit Recovery", desc: "AI-recommended recovery routes — MSME Samadhan, SARFAESI, or legal notice — based on your specific case." },
              ].map((item) => (
                <Card key={item.title}>
                  <CardContent className="pt-6">
                    <p className="font-semibold mb-1">{item.title}</p>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold flex items-center gap-2"><Users className="h-6 w-6 text-primary" /> Our Team</h2>
            <p className="text-muted-foreground">
              NyayaSetu is built by a team of technologists, legal professionals, and MSME advocates
              who understand the Indian legal landscape. We combine deep AI expertise with practical
              knowledge of Indian commercial law — the Indian Contract Act, MSME Development Act,
              GST Act, SARFAESI Act, and NI Act (Sec 138).
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold flex items-center gap-2"><Mail className="h-6 w-6 text-primary" /> Contact Us</h2>
            <p className="text-muted-foreground mb-4">
              Have questions, feedback, or partnership inquiries? We&apos;d love to hear from you.
            </p>
            <div className="space-y-2 text-muted-foreground">
              <p>Email: <strong>contact@nyayasetu.in</strong></p>
              <p>Support: <strong>support@nyayasetu.in</strong></p>
              <p>Location: India</p>
            </div>
          </section>

          <section className="text-sm text-muted-foreground border-t pt-6">
            <p>
              <strong>Disclaimer:</strong> NyayaSetu provides AI-generated legal information and document
              drafting assistance. It is not a substitute for professional legal advice. Always consult a
              qualified advocate for complex legal matters. See our{" "}
              <Link href="/disclaimer" className="text-primary hover:underline">full disclaimer</Link>.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}

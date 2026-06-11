import Link from "next/link";
import { Scale, FileSearch, FileText, Receipt, Landmark, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    icon: FileSearch,
    title: "Contract Risk Scanner",
    titleHi: "अनुबंध जोखिम स्कैनर",
    desc: "Upload any contract — get instant risk flags, missing clauses, and plain-language summaries in Hindi or English.",
    descHi: "कोई भी अनुबंध अपलोड करें — हिंदी या अंग्रेजी में तुरंत जोखिम, लापता खंड और सरल सारांश पाएं।",
  },
  {
    icon: FileText,
    title: "Legal Notice Engine",
    titleHi: "कानूनी नोटिस इंजन",
    desc: "Draft demand notices, cheque bounce notices (Sec 138), eviction notices — formatted and legally sound.",
    descHi: "मांग नोटिस, चेक बाउंस नोटिस (धारा 138), बेदखली नोटिस — कानूनी रूप से सही और स्वरूपित।",
  },
  {
    icon: Receipt,
    title: "GST Dispute Playbooks",
    titleHi: "GST विवाद प्लेबुक",
    desc: "Step-by-step guidance for show cause notices, appeals, and GST compliance issues with draft replies.",
    descHi: "कारण बताओ नोटिस, अपील और GST अनुपालन मुद्दों के लिए चरणबद्ध मार्गदर्शन और उत्तर का मसौदा।",
  },
  {
    icon: Landmark,
    title: "Credit Recovery",
    titleHi: "ऋण वसूली",
    desc: "Recover dues via MSME Samadhan, SARFAESI, or legal notice — AI picks the best route for your case.",
    descHi: "MSME समाधान, SARFAESI या कानूनी नोटिस से बकाया वसूलें — AI आपके मामले के लिए सबसे अच्छा रास्ता चुनता है।",
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <header className="border-b">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Scale className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold">NyayaSetu</span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/dashboard">
              <Button variant="outline">Login</Button>
            </Link>
            <Link href="/dashboard">
              <Button>Get Started Free</Button>
            </Link>
          </div>
        </div>
      </header>

      <section className="max-w-6xl mx-auto px-4 py-16 md:py-24 text-center">
        <div className="inline-block mb-4 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
          भारत का पहला AI कानूनी सहायक — India&apos;s First AI Legal OS for MSMEs
        </div>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
          कानूनी समस्या?<br />
          <span className="text-primary">AI से समाधान पाएं।</span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-4">
          अनुबंध समीक्षा, कानूनी नोटिस, GST विवाद और ऋण वसूली — सब कुछ हिंदी में,
          AI की शक्ति से। वकील की फीस का 1/10 खर्च में।
        </p>
        <p className="text-base text-muted-foreground max-w-2xl mx-auto mb-8">
          Contract reviews, legal notices, GST disputes, and credit recovery — powered by AI,
          in Hindi and English. At 1/10th the cost of a lawyer.
        </p>
        <Link href="/dashboard">
          <Button size="lg" className="text-lg px-8">
            मुफ्त शुरू करें — Start Free
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Link>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">
          चार शक्तिशाली मॉड्यूल — Four Powerful Modules
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {features.map((f) => (
            <Card key={f.title} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <f.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{f.titleHi}</CardTitle>
                    <CardDescription>{f.title}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm mb-2">{f.descHi}</p>
                <p className="text-muted-foreground text-xs">{f.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="bg-primary text-primary-foreground py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            अपने व्यापार की कानूनी सुरक्षा शुरू करें
          </h2>
          <p className="text-lg mb-2 opacity-90">
            Start Protecting Your Business Today
          </p>
          <p className="mb-8 opacity-75">
            50,000+ MSMEs अनसुलझे कानूनी मुद्दों से जूझ रहे हैं। आप अकेले नहीं हैं।
          </p>
          <Link href="/dashboard">
            <Button size="lg" variant="secondary" className="text-lg px-8">
              अभी शुरू करें — Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      <footer className="border-t py-8">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Scale className="h-5 w-5" />
            <span>NyayaSetu — न्यायसेतु</span>
          </div>
          <p>&copy; 2026 NyayaSetu. Made in India for India.</p>
        </div>
      </footer>
    </div>
  );
}

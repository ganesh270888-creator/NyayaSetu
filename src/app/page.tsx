import Link from "next/link";
import { Scale, FileSearch, FileText, Receipt, Landmark, ArrowRight, Check, Star, Shield, Users } from "lucide-react";
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

const testimonials = [
  {
    name: "Rajesh Patel",
    role: "MSME Owner, Surat",
    roleHi: "MSME मालिक, सूरत",
    text: "NyayaSetu saved us ₹2 lakh in legal fees. The contract scanner caught risky clauses our team missed.",
    textHi: "NyayaSetu ने हमें ₹2 लाख कानूनी फीस बचाई। अनुबंध स्कैनर ने वे खतरनाक धाराएं पकड़ीं जो हमारी टीम से छूट गई थीं।",
  },
  {
    name: "Priya Sharma",
    role: "CA, Delhi",
    roleHi: "CA, दिल्ली",
    text: "The GST playbooks are incredibly detailed. My clients get step-by-step guidance in Hindi — game changer.",
    textHi: "GST प्लेबुक अविश्वसनीय रूप से विस्तृत हैं। मेरे क्लाइंट्स को हिंदी में चरणबद्ध मार्गदर्शन मिलता है।",
  },
  {
    name: "Ankit Verma",
    role: "Small Business Owner, Jaipur",
    roleHi: "लघु व्यवसाय मालिक, जयपुर",
    text: "Recovered ₹5 lakh from a defaulting client using the credit recovery module. The demand notice was perfect.",
    textHi: "क्रेडिट रिकवरी मॉड्यूल से एक डिफ़ॉल्टिंग क्लाइंट से ₹5 लाख वसूले। मांग नोटिस एकदम सही था।",
  },
];

const pricingPlans = [
  {
    name: "Free",
    nameHi: "मुफ्त",
    price: "₹0",
    features: ["3 contract scans/month", "2 legal notices/month", "Basic support"],
    featuresHi: ["3 अनुबंध स्कैन/महीना", "2 कानूनी नोटिस/महीना", "बेसिक सपोर्ट"],
  },
  {
    name: "Starter",
    nameHi: "स्टार्टर",
    price: "₹999",
    popular: true,
    features: ["25 scans/month", "15 notices/month", "PDF export", "Priority support"],
    featuresHi: ["25 स्कैन/महीना", "15 नोटिस/महीना", "PDF डाउनलोड", "प्राथमिकता सपोर्ट"],
  },
  {
    name: "Professional",
    nameHi: "प्रोफेशनल",
    price: "₹2,499",
    features: ["Unlimited everything", "Database & history", "Dedicated support"],
    featuresHi: ["सब असीमित", "डेटाबेस और इतिहास", "समर्पित सपोर्ट"],
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b sticky top-0 bg-background/95 backdrop-blur z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Scale className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold">NyayaSetu</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#features" className="text-muted-foreground hover:text-foreground">Features</a>
            <a href="#pricing" className="text-muted-foreground hover:text-foreground">Pricing</a>
            <a href="#testimonials" className="text-muted-foreground hover:text-foreground">Reviews</a>
            <Link href="/about" className="text-muted-foreground hover:text-foreground">About</Link>
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="outline">Login</Button>
            </Link>
            <Link href="/register">
              <Button>Get Started Free</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
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
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/register">
            <Button size="lg" className="text-lg px-8">
              मुफ्त शुरू करें — Start Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Link href="#features">
            <Button size="lg" variant="outline" className="text-lg px-8">
              जानें कैसे — Learn More
            </Button>
          </Link>
        </div>
        <div className="flex items-center justify-center gap-6 mt-8 text-sm text-muted-foreground">
          <span className="flex items-center gap-1"><Check className="h-4 w-4 text-green-500" /> No credit card required</span>
          <span className="flex items-center gap-1"><Check className="h-4 w-4 text-green-500" /> Hindi & English</span>
          <span className="flex items-center gap-1"><Check className="h-4 w-4 text-green-500" /> AI-powered</span>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-4">
          चार शक्तिशाली मॉड्यूल — Four Powerful Modules
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Every tool an MSME needs to handle legal matters confidently, without expensive lawyers.
        </p>
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

      {/* Pricing */}
      <section id="pricing" className="bg-muted/50 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">
            सरल मूल्य — Simple Pricing
          </h2>
          <p className="text-center text-muted-foreground mb-12">
            वकील की फीस का 1/10 — At 1/10th the cost of a lawyer
          </p>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {pricingPlans.map((plan) => (
              <Card key={plan.name} className={`relative ${plan.popular ? "border-primary shadow-lg" : ""}`}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-medium px-3 py-1 rounded-full">
                    Most Popular
                  </div>
                )}
                <CardHeader className="text-center">
                  <CardTitle>{plan.nameHi} — {plan.name}</CardTitle>
                  <p className="text-3xl font-bold mt-2">{plan.price}<span className="text-sm font-normal text-muted-foreground">/month</span></p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-6">
                    {plan.features.map((f, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm">
                        <Check className="h-4 w-4 text-green-500 shrink-0" />
                        {plan.featuresHi[i]} — {f}
                      </li>
                    ))}
                  </ul>
                  <Link href="/register">
                    <Button className="w-full" variant={plan.popular ? "default" : "outline"}>
                      {plan.popular ? "Get Started" : "Try Free"}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
          <p className="text-center text-sm text-muted-foreground mt-8">
            Enterprise plans available.{" "}
            <Link href="/about" className="text-primary hover:underline">Contact us</Link> for custom pricing.
          </p>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-4">
          हमारे उपयोगकर्ता क्या कहते हैं — What Our Users Say
        </h2>
        <p className="text-center text-muted-foreground mb-12">
          Trusted by MSMEs, CAs, and advocates across India
        </p>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <Card key={t.name}>
              <CardContent className="pt-6">
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mb-2">&ldquo;{t.textHi}&rdquo;</p>
                <p className="text-xs text-muted-foreground italic mb-4">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.roleHi}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA */}
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
          <Link href="/register">
            <Button size="lg" variant="secondary" className="text-lg px-8">
              मुफ्त रजिस्टर करें — Register Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Scale className="h-6 w-6 text-primary" />
                <span className="font-bold text-lg">NyayaSetu</span>
              </div>
              <p className="text-sm text-muted-foreground">
                AI-powered legal intelligence for Indian MSMEs. Making justice accessible.
              </p>
            </div>
            <div>
              <p className="font-semibold mb-3">Product</p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#features" className="hover:text-foreground">Features</a></li>
                <li><a href="#pricing" className="hover:text-foreground">Pricing</a></li>
                <li><Link href="/login" className="hover:text-foreground">Login</Link></li>
                <li><Link href="/register" className="hover:text-foreground">Register</Link></li>
              </ul>
            </div>
            <div>
              <p className="font-semibold mb-3">Company</p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/about" className="hover:text-foreground">About Us</Link></li>
                <li><Link href="/contact" className="hover:text-foreground">Contact</Link></li>
              </ul>
            </div>
            <div>
              <p className="font-semibold mb-3">Legal</p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/privacy" className="hover:text-foreground">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-foreground">Terms of Service</Link></li>
                <li><Link href="/disclaimer" className="hover:text-foreground">Disclaimer</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <p>&copy; 2026 NyayaSetu — न्यायसेतु. Made in India for India.</p>
            <p>contact@nyayasetu.in</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

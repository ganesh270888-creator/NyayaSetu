"use client";

import { HelpCircle, FileSearch, FileText, Receipt, Landmark, MessageCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/components/language-provider";

const faqs = [
  {
    q: "Is this a substitute for a lawyer?",
    qHi: "क्या यह वकील का विकल्प है?",
    a: "NyayaSetu is an AI legal intelligence tool that helps you understand your rights, draft documents, and navigate legal processes. For complex matters or court appearances, always consult a qualified advocate.",
    aHi: "न्यायसेतु एक AI कानूनी सहायक उपकरण है जो आपको आपके अधिकार समझने, दस्तावेज तैयार करने और कानूनी प्रक्रिया में मदद करता है। जटिल मामलों या अदालत में पेशी के लिए हमेशा योग्य वकील से सलाह लें।",
  },
  {
    q: "Is my data safe?",
    qHi: "क्या मेरा डेटा सुरक्षित है?",
    a: "Yes. Your documents and data are encrypted and never shared with third parties. We use enterprise-grade security for all data storage and processing.",
    aHi: "हां। आपके दस्तावेज और डेटा एन्क्रिप्टेड हैं और कभी तीसरे पक्ष के साथ साझा नहीं किए जाते। हम सभी डेटा भंडारण के लिए एंटरप्राइज-ग्रेड सुरक्षा का उपयोग करते हैं।",
  },
  {
    q: "Which languages are supported?",
    qHi: "कौन सी भाषाएं समर्थित हैं?",
    a: "Currently Hindi and English. We're working on adding Marathi, Gujarati, Tamil, Bengali, Telugu, and Kannada.",
    aHi: "वर्तमान में हिंदी और अंग्रेजी। हम मराठी, गुजराती, तमिल, बंगाली, तेलुगु और कन्नड़ जोड़ने पर काम कर रहे हैं।",
  },
  {
    q: "How accurate is the AI analysis?",
    qHi: "AI विश्लेषण कितना सटीक है?",
    a: "Our AI is trained on Indian legal frameworks and provides highly accurate analysis. However, always verify critical legal decisions with a qualified professional.",
    aHi: "हमारा AI भारतीय कानूनी ढांचे पर प्रशिक्षित है और अत्यधिक सटीक विश्लेषण प्रदान करता है। हालांकि, महत्वपूर्ण कानूनी निर्णयों को हमेशा योग्य पेशेवर से सत्यापित करें।",
  },
];

export default function HelpPage() {
  const { locale } = useLanguage();

  const modules = [
    { icon: FileSearch, name: locale === "hi" ? "अनुबंध स्कैनर" : "Contract Scanner", desc: locale === "hi" ? "अनुबंध अपलोड या पेस्ट करें, AI जोखिम, लापता खंड और अनुपालन मुद्दे बताएगा" : "Upload or paste a contract, AI will flag risks, missing clauses, and compliance issues" },
    { icon: FileText, name: locale === "hi" ? "कानूनी नोटिस" : "Legal Notices", desc: locale === "hi" ? "विवरण भरें, AI कानूनी नोटिस तैयार करेगा — मांग नोटिस, चेक बाउंस, बेदखली आदि" : "Fill in details, AI drafts legal notices — demand, cheque bounce, eviction, etc." },
    { icon: Receipt, name: locale === "hi" ? "GST विवाद" : "GST Disputes", desc: locale === "hi" ? "GST नोटिस का जवाब तैयार करें, अपील की रणनीति बनाएं, समय सीमा ट्रैक करें" : "Draft GST notice replies, plan appeal strategy, track deadlines" },
    { icon: Landmark, name: locale === "hi" ? "ऋण वसूली" : "Credit Recovery", desc: locale === "hi" ? "MSME समाधान, SARFAESI या कानूनी नोटिस — AI सबसे अच्छा रास्ता सुझाएगा" : "MSME Samadhan, SARFAESI, or legal notice — AI suggests the best route" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <HelpCircle className="h-8 w-8 text-primary" />
          {locale === "hi" ? "सहायता केंद्र" : "Help Center"}
        </h1>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">
          {locale === "hi" ? "मॉड्यूल गाइड" : "Module Guide"}
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          {modules.map((m) => (
            <Card key={m.name}>
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <m.icon className="h-6 w-6 text-primary shrink-0" />
                  <div>
                    <p className="font-semibold">{m.name}</p>
                    <p className="text-sm text-muted-foreground mt-1">{m.desc}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">
          {locale === "hi" ? "अक्सर पूछे जाने वाले प्रश्न" : "FAQs"}
        </h2>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <Card key={i}>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">
                  {locale === "hi" ? faq.qHi : faq.q}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {locale === "hi" ? faq.aHi : faq.a}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

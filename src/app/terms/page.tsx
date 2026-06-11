import Link from "next/link";
import { Scale, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function TermsPage() {
  return (
    <div className="min-h-screen">
      <header className="border-b">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Scale className="h-6 w-6 text-primary" />
            <span className="font-bold">NyayaSetu</span>
          </Link>
          <Link href="/"><Button variant="ghost" size="sm"><ArrowLeft className="h-4 w-4 mr-1" /> Back</Button></Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12 prose prose-neutral max-w-none">
        <h1 className="text-3xl font-bold mb-2">Terms of Service — सेवा की शर्तें</h1>
        <p className="text-muted-foreground mb-8">Effective: June 2026</p>

        <h2 className="text-xl font-semibold mt-8 mb-3">1. Acceptance of Terms</h2>
        <p className="text-muted-foreground mb-4">
          By accessing or using NyayaSetu (&ldquo;the Service&rdquo;), you agree to be bound by these
          Terms of Service. If you do not agree, do not use the Service.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-3">2. Description of Service</h2>
        <p className="text-muted-foreground mb-4">
          NyayaSetu is an AI-powered legal intelligence platform that provides: contract risk analysis,
          legal notice drafting, GST dispute guidance, and credit recovery planning. The Service
          generates outputs using artificial intelligence and is designed to assist, not replace,
          professional legal advice.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-3">3. Not Legal Advice</h2>
        <p className="text-muted-foreground mb-4">
          <strong>IMPORTANT:</strong> NyayaSetu does not provide legal advice. The AI-generated content
          is for informational and educational purposes only. It does not create an attorney-client
          relationship. For specific legal situations, always consult a qualified advocate enrolled
          with the Bar Council of India.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-3">4. User Accounts</h2>
        <p className="text-muted-foreground mb-4">
          You are responsible for maintaining the confidentiality of your account credentials.
          You agree to provide accurate information during registration. You must be at least
          18 years old to use this Service.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-3">5. Acceptable Use</h2>
        <p className="text-muted-foreground mb-4">You agree not to:</p>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-4">
          <li>Use the Service for any unlawful purpose</li>
          <li>Upload malicious content or attempt to compromise the system</li>
          <li>Misrepresent AI-generated content as professional legal advice to third parties</li>
          <li>Resell or redistribute the Service without authorization</li>
          <li>Use the Service to generate fraudulent legal documents</li>
        </ul>

        <h2 className="text-xl font-semibold mt-8 mb-3">6. Intellectual Property</h2>
        <p className="text-muted-foreground mb-4">
          Content you upload remains your property. AI-generated outputs (analyses, notices, playbooks)
          are licensed to you for personal and business use. The NyayaSetu platform, brand, and
          underlying technology remain our intellectual property.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-3">7. Payments & Subscriptions</h2>
        <p className="text-muted-foreground mb-4">
          Paid plans are billed monthly via Razorpay. You may cancel at any time; cancellation takes
          effect at the end of the current billing period. Refunds are available within 7 days of
          purchase if you are unsatisfied with the Service.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-3">8. Limitation of Liability</h2>
        <p className="text-muted-foreground mb-4">
          NyayaSetu is provided &ldquo;as is&rdquo; without warranties of any kind. We are not liable
          for any damages arising from reliance on AI-generated content. Our total liability is
          limited to the amount you paid for the Service in the 12 months preceding the claim.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-3">9. Governing Law</h2>
        <p className="text-muted-foreground mb-4">
          These Terms are governed by the laws of India. Any disputes shall be subject to the
          exclusive jurisdiction of courts in New Delhi, India.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-3">10. Contact</h2>
        <p className="text-muted-foreground mb-4">
          Questions about these Terms? Email us at <strong>legal@nyayasetu.in</strong>.
        </p>
      </main>
    </div>
  );
}

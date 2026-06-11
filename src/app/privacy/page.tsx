import Link from "next/link";
import { Scale, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PrivacyPage() {
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
        <h1 className="text-3xl font-bold mb-2">Privacy Policy — गोपनीयता नीति</h1>
        <p className="text-muted-foreground mb-8">Last updated: June 2026</p>

        <h2 className="text-xl font-semibold mt-8 mb-3">1. Information We Collect</h2>
        <p className="text-muted-foreground mb-4">
          <strong>Account Information:</strong> When you register, we collect your name, email address,
          phone number, and business details (business name, GSTIN, Udyam number) that you voluntarily provide.
        </p>
        <p className="text-muted-foreground mb-4">
          <strong>Usage Data:</strong> We collect information about how you use our services — documents
          you upload, analyses you request, and notices you draft. This data is used solely to provide
          and improve our services.
        </p>
        <p className="text-muted-foreground mb-4">
          <strong>Technical Data:</strong> IP address, browser type, device information, and cookies for
          session management and analytics.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-3">2. How We Use Your Information</h2>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-4">
          <li>To provide AI-powered legal analysis and document drafting services</li>
          <li>To maintain your account and save your case history</li>
          <li>To process payments via Razorpay (we do not store card details)</li>
          <li>To improve our AI models and service quality</li>
          <li>To communicate service updates and important notices</li>
        </ul>

        <h2 className="text-xl font-semibold mt-8 mb-3">3. Data Protection (DPDP Act Compliance)</h2>
        <p className="text-muted-foreground mb-4">
          We comply with the Digital Personal Data Protection Act, 2023 (DPDP Act) of India.
          Your personal data is processed only with your consent and for legitimate purposes as
          outlined in this policy. You have the right to:
        </p>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-4">
          <li>Access your personal data</li>
          <li>Request correction of inaccurate data</li>
          <li>Request deletion of your data (right to erasure)</li>
          <li>Withdraw consent at any time</li>
          <li>File a complaint with the Data Protection Board of India</li>
        </ul>

        <h2 className="text-xl font-semibold mt-8 mb-3">4. Data Storage & Security</h2>
        <p className="text-muted-foreground mb-4">
          Your data is stored on encrypted servers. Documents you upload are processed for text
          extraction and AI analysis, then stored securely. We use industry-standard encryption
          (TLS/SSL) for data in transit and AES-256 for data at rest. Passwords are hashed using
          bcrypt and never stored in plain text.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-3">5. Third-Party Services</h2>
        <p className="text-muted-foreground mb-4">
          We use the following third-party services: <strong>OpenAI</strong> for AI processing
          (contract text is sent for analysis), <strong>Razorpay</strong> for payment processing,
          and <strong>Vercel</strong> for hosting. Each has their own privacy policies. We do not
          sell your data to any third party.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-3">6. Data Retention</h2>
        <p className="text-muted-foreground mb-4">
          We retain your data for as long as your account is active. You can request deletion of
          your account and all associated data at any time by contacting support@nyayasetu.in.
          We will process deletion requests within 30 days.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-3">7. Contact</h2>
        <p className="text-muted-foreground mb-4">
          For privacy-related queries or to exercise your rights under the DPDP Act, contact our
          Data Protection Officer at <strong>privacy@nyayasetu.in</strong>.
        </p>
      </main>
    </div>
  );
}

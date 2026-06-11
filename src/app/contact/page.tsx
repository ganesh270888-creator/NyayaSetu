import Link from "next/link";
import { Scale, ArrowLeft, Mail, Phone, MapPin, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ContactPage() {
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

      <main className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-2">Contact Us — संपर्क करें</h1>
        <p className="text-muted-foreground mb-8">
          We&apos;re here to help. Reach out with questions, feedback, or partnership inquiries.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-primary" />
                Email
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <div>
                <p className="font-medium text-foreground">General Inquiries</p>
                <p>contact@nyayasetu.in</p>
              </div>
              <div>
                <p className="font-medium text-foreground">Technical Support</p>
                <p>support@nyayasetu.in</p>
              </div>
              <div>
                <p className="font-medium text-foreground">Privacy & Legal</p>
                <p>privacy@nyayasetu.in</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5 text-primary" />
                Support Hours
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <div>
                <p className="font-medium text-foreground">Monday – Friday</p>
                <p>10:00 AM – 6:00 PM IST</p>
              </div>
              <div>
                <p className="font-medium text-foreground">Saturday</p>
                <p>10:00 AM – 2:00 PM IST</p>
              </div>
              <div>
                <p className="font-medium text-foreground">Response Time</p>
                <p>Within 24 hours for free users, 4 hours for paid plans</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-primary" />
                Phone & WhatsApp
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              <p>WhatsApp support coming soon for paid plan users.</p>
              <p className="mt-2">For urgent matters, email support@nyayasetu.in with &ldquo;URGENT&rdquo; in the subject line.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                Location
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              <p className="font-medium text-foreground">NyayaSetu</p>
              <p>India</p>
              <p className="mt-3 text-xs">
                NyayaSetu is a digital-first company serving MSMEs across all Indian states.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            Want to partner with us or integrate NyayaSetu into your platform?{" "}
            <strong>Email partnerships@nyayasetu.in</strong>
          </p>
        </div>
      </main>
    </div>
  );
}

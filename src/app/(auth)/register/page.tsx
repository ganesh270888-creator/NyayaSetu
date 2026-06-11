"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Scale, UserPlus } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const phone = formData.get("phone") as string;
    const businessName = formData.get("businessName") as string;

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, phone, businessName }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Registration failed");
      }

      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Registration succeeded but login failed. Please try logging in.");
        setLoading(false);
      } else {
        router.push("/dashboard");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed");
      setLoading(false);
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-2">
          <Scale className="h-10 w-10 text-primary" />
        </div>
        <CardTitle className="text-2xl">न्यायसेतु — NyayaSetu</CardTitle>
        <CardDescription>
          नया खाता बनाएं — Create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">नाम — Name *</Label>
            <Input id="name" name="name" required placeholder="आपका नाम" />
          </div>
          <div>
            <Label htmlFor="email">ईमेल — Email *</Label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              placeholder="you@example.com"
            />
          </div>
          <div>
            <Label htmlFor="password">पासवर्ड — Password *</Label>
            <Input
              id="password"
              name="password"
              type="password"
              required
              placeholder="कम से कम 6 अक्षर"
              minLength={6}
            />
          </div>
          <div>
            <Label htmlFor="phone">फोन — Phone</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              placeholder="+91 98765 43210"
            />
          </div>
          <div>
            <Label htmlFor="businessName">व्यवसाय का नाम — Business Name</Label>
            <Input
              id="businessName"
              name="businessName"
              placeholder="आपकी कंपनी"
            />
          </div>

          {error && (
            <p className="text-destructive text-sm text-center">{error}</p>
          )}

          <Button type="submit" className="w-full" disabled={loading}>
            <UserPlus className="h-4 w-4 mr-2" />
            {loading ? "रजिस्टर हो रहा है..." : "रजिस्टर — Register"}
          </Button>
        </form>

        <div className="mt-4 text-center text-sm text-muted-foreground">
          पहले से खाता है? —{" "}
          <Link href="/login" className="text-primary font-medium hover:underline">
            लॉगिन करें — Login
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

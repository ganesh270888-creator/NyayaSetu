"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Scale, LogIn } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError("गलत ईमेल या पासवर्ड — Invalid email or password");
      setLoading(false);
    } else {
      router.push("/dashboard");
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
          लॉगिन करें — Sign in to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email">ईमेल — Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              placeholder="you@example.com"
            />
          </div>
          <div>
            <Label htmlFor="password">पासवर्ड — Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              required
              placeholder="••••••"
              minLength={6}
            />
          </div>

          {error && (
            <p className="text-destructive text-sm text-center">{error}</p>
          )}

          <Button type="submit" className="w-full" disabled={loading}>
            <LogIn className="h-4 w-4 mr-2" />
            {loading ? "लॉगिन हो रहा है..." : "लॉगिन — Sign In"}
          </Button>
        </form>

        <div className="mt-4 text-center text-sm text-muted-foreground">
          खाता नहीं है? —{" "}
          <Link href="/register" className="text-primary font-medium hover:underline">
            रजिस्टर करें — Register
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

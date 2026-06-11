"use client";

import { Settings, Globe, Building2, User } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLanguage } from "@/components/language-provider";

export default function SettingsPage() {
  const { tr, locale, setLocale } = useLanguage();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <Settings className="h-8 w-8 text-primary" />
          {tr.nav.settings}
        </h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            {locale === "hi" ? "भाषा सेटिंग" : "Language Settings"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="max-w-xs">
            <Label>{tr.common.language}</Label>
            <Select value={locale} onValueChange={(v) => setLocale(v as "hi" | "en")}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="hi">हिंदी</SelectItem>
                <SelectItem value="en">English</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            {locale === "hi" ? "प्रोफ़ाइल" : "Profile"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 max-w-md">
          <div>
            <Label>{locale === "hi" ? "नाम" : "Name"}</Label>
            <Input placeholder={locale === "hi" ? "आपका नाम" : "Your name"} />
          </div>
          <div>
            <Label>{locale === "hi" ? "ईमेल" : "Email"}</Label>
            <Input placeholder="email@example.com" type="email" />
          </div>
          <div>
            <Label>{locale === "hi" ? "फोन" : "Phone"}</Label>
            <Input placeholder="+91" type="tel" />
          </div>
          <Button>{tr.common.save}</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            {locale === "hi" ? "व्यवसाय विवरण" : "Business Details"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 max-w-md">
          <div>
            <Label>{locale === "hi" ? "व्यवसाय का नाम" : "Business Name"}</Label>
            <Input placeholder={locale === "hi" ? "आपकी कंपनी" : "Your company"} />
          </div>
          <div>
            <Label>GSTIN</Label>
            <Input placeholder="22AAAAA0000A1Z5" maxLength={15} />
          </div>
          <div>
            <Label>{locale === "hi" ? "उद्यम नंबर" : "Udyam Number"}</Label>
            <Input placeholder="UDYAM-XX-00-0000000" />
          </div>
          <Button>{tr.common.save}</Button>
        </CardContent>
      </Card>
    </div>
  );
}

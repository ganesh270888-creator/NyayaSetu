"use client";

import Link from "next/link";
import { FileSearch, FileText, Receipt, Landmark, TrendingUp, Clock, Shield } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/components/language-provider";

export default function DashboardPage() {
  const { tr, locale } = useLanguage();

  const stats = [
    { label: tr.dashboard.activeCases, value: "0", icon: TrendingUp, color: "text-blue-600" },
    { label: tr.dashboard.contractsReviewed, value: "0", icon: Shield, color: "text-green-600" },
    { label: tr.dashboard.noticesDrafted, value: "0", icon: FileText, color: "text-orange-600" },
    { label: tr.dashboard.pendingDisputes, value: "0", icon: Clock, color: "text-red-600" },
  ];

  const quickActions = [
    {
      href: "/contracts",
      label: tr.dashboard.newContract,
      icon: FileSearch,
      desc: locale === "hi" ? "अनुबंध में जोखिम खोजें" : "Find risks in contracts",
      color: "bg-blue-50 hover:bg-blue-100",
    },
    {
      href: "/notices",
      label: tr.dashboard.newNotice,
      icon: FileText,
      desc: locale === "hi" ? "कानूनी नोटिस तैयार करें" : "Draft a legal notice",
      color: "bg-orange-50 hover:bg-orange-100",
    },
    {
      href: "/gst",
      label: tr.dashboard.newDispute,
      icon: Receipt,
      desc: locale === "hi" ? "GST नोटिस का जवाब दें" : "Respond to GST notice",
      color: "bg-purple-50 hover:bg-purple-100",
    },
    {
      href: "/recovery",
      label: tr.dashboard.newRecovery,
      icon: Landmark,
      desc: locale === "hi" ? "बकाया राशि वसूलें" : "Recover pending dues",
      color: "bg-green-50 hover:bg-green-100",
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">
          {tr.dashboard.welcome} 👋
        </h1>
        <p className="text-muted-foreground mt-1">
          {locale === "hi"
            ? "आज आप क्या करना चाहेंगे?"
            : "What would you like to do today?"}
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
                <div>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-semibold mb-4">{tr.dashboard.quickActions}</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {quickActions.map((action) => (
            <Link key={action.href} href={action.href}>
              <Card className={`${action.color} transition-colors cursor-pointer border-none`}>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <action.icon className="h-8 w-8 text-primary shrink-0" />
                    <div>
                      <p className="font-semibold">{action.label}</p>
                      <p className="text-sm text-muted-foreground">{action.desc}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>{tr.dashboard.recentActivity}</CardTitle>
          <CardDescription>
            {locale === "hi"
              ? "आपकी हाल की गतिविधि यहां दिखेगी"
              : "Your recent activity will appear here"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground">
            <Shield className="h-12 w-12 mb-4 opacity-30" />
            <p className="text-lg font-medium">
              {locale === "hi" ? "अभी कोई गतिविधि नहीं" : "No activity yet"}
            </p>
            <p className="text-sm mt-1">
              {locale === "hi"
                ? "अपना पहला मामला शुरू करने के लिए ऊपर क्विक एक्शन चुनें"
                : "Choose a quick action above to start your first case"}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

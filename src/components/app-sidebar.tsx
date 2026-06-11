"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileSearch,
  FileText,
  Receipt,
  Landmark,
  Settings,
  HelpCircle,
  Scale,
  Globe,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/language-provider";

export function AppSidebar() {
  const pathname = usePathname();
  const { tr, locale, setLocale } = useLanguage();

  const navItems = [
    { href: "/dashboard", label: tr.nav.dashboard, icon: LayoutDashboard },
    { href: "/contracts", label: tr.nav.contracts, icon: FileSearch },
    { href: "/notices", label: tr.nav.notices, icon: FileText },
    { href: "/gst", label: tr.nav.gst, icon: Receipt },
    { href: "/recovery", label: tr.nav.recovery, icon: Landmark },
  ];

  const bottomItems = [
    { href: "/settings", label: tr.nav.settings, icon: Settings },
    { href: "/help", label: tr.nav.help, icon: HelpCircle },
  ];

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <Link href="/dashboard" className="flex items-center gap-2">
          <Scale className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-lg font-bold leading-none">{tr.app.name}</h1>
            <p className="text-xs text-muted-foreground mt-0.5">
              {locale === "hi" ? "AI कानूनी सहायक" : "AI Legal Assistant"}
            </p>
          </div>
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>
            {locale === "hi" ? "मुख्य मेनू" : "Main Menu"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    isActive={pathname === item.href}
                    render={<Link href={item.href} />}
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {bottomItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    isActive={pathname === item.href}
                    render={<Link href={item.href} />}
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <Button
          variant="outline"
          size="sm"
          className="w-full"
          onClick={() => setLocale(locale === "hi" ? "en" : "hi")}
        >
          <Globe className="h-4 w-4 mr-2" />
          {locale === "hi" ? "English" : "हिंदी"}
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}

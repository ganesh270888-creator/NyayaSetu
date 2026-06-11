"use client";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/components/language-provider";
import { AppSidebar } from "@/components/app-sidebar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <TooltipProvider>
        <SidebarProvider>
          <AppSidebar />
          <main className="flex-1 overflow-auto">
            <div className="flex items-center gap-2 border-b px-4 py-2 md:hidden">
              <SidebarTrigger />
            </div>
            <div className="p-4 md:p-8 max-w-6xl mx-auto">{children}</div>
          </main>
        </SidebarProvider>
      </TooltipProvider>
    </LanguageProvider>
  );
}

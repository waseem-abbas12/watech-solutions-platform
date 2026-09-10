"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Navbar } from "@/components/common/navbar";
import { Footer } from "@/components/common/footer";
import { MobileBottomNav } from "@/components/common/mobile-bottom-nav";
import { AiAssistantWidget } from "@/components/common/ai-assistant-widget";

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Standalone dedicated websites have their own independent headers, footers, and navigation.
  const isDedicatedPortal =
    pathname.startsWith("/real-estate") ||
    pathname.startsWith("/furniture") ||
    pathname.startsWith("/agency") ||
    pathname.startsWith("/admin");

  if (isDedicatedPortal) {
    return (
      <>
        <main className="flex-grow">{children}</main>
        {!pathname.startsWith("/admin") && <AiAssistantWidget />}
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="flex-grow pt-20">{children}</main>
      <Footer />
      <MobileBottomNav />
      <AiAssistantWidget />
    </>
  );
}

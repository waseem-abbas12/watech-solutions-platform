import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { ArrowLeft, Home, Search, BookOpen, Layers, MessageCircle, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "404 - Page Not Found | WATECH Solutions",
  description: "The page you are looking for does not exist or has been moved.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  const quickLinks = [
    { name: "Marketplace", href: "/marketplace", icon: Layers, desc: "Explore verified real estate, Chinioti furniture, and Food & Catering" },
    { name: "Digital Services", href: "/services", icon: Search, desc: "Marketing funnels, Next.js web platforms, and WhatsApp bots" },
    { name: "Blog & Insights", href: "/blog", icon: BookOpen, desc: "Expert guides on property, woodwork, and business growth" },
    { name: "About WATECH", href: "/about", icon: Home, desc: "Learn about Pakistan's multi-sector growth ecosystem" },
  ];

  return (
    <div className="w-full bg-white text-slate-900 selection:bg-[#2563EB] selection:text-white min-h-[75vh] flex items-center justify-center py-20 px-6">
      <div className="max-w-2xl mx-auto text-center space-y-8">
        <div className="space-y-4">
          <span className="px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-xs font-bold uppercase tracking-wider text-[#2563EB]">
            Error 404
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Page Not Found
          </h1>
          <p className="text-sm sm:text-base text-slate-600 max-w-md mx-auto leading-relaxed">
            The link you clicked may be broken, or the page may have been moved. Let's get you back on track.
          </p>
        </div>

        {/* Quick Navigation Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left pt-2">
          {quickLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="p-5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-blue-300 hover:bg-blue-50/40 transition-all group"
            >
              <div className="flex items-center gap-2.5 mb-1.5">
                <link.icon className="w-4 h-4 text-[#2563EB]" />
                <span className="text-sm font-bold text-slate-900 group-hover:text-[#2563EB] transition-colors">
                  {link.name}
                </span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                {link.desc}
              </p>
            </Link>
          ))}
        </div>

        <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-slate-900 text-white text-xs font-bold uppercase tracking-wider hover:bg-slate-800 transition-colors shadow-sm"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Homepage</span>
          </Link>

          <a
            href="https://wa.me/923270831470?text=Assalam-o-Alaikum%20Watech%20support,%20I%20hit%20a%20broken%20page%20on%20your%20website."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 text-xs font-bold uppercase tracking-wider transition-colors"
          >
            <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
            <span>Report Broken Link</span>
          </a>
        </div>
      </div>
    </div>
  );
}
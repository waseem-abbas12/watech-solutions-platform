import React from "react";
import Link from "next/link";
import { SocialIcons } from "@/components/common/social-icons";

export const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 py-16 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="space-y-4">
          <span className="text-2xl font-black tracking-tight text-white">
            WATECH<span className="text-[#2563EB]">.</span>
          </span>
          <p className="text-sm text-slate-400 leading-relaxed">
            Pakistan's integrated ecosystem connecting Real Estate, Chinioti Handcrafted Furniture, and Food & Catering with modern technology.
          </p>
          <div className="flex items-center gap-3 pt-2">
            <a
              href="https://wa.me/923270831470"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat with WATECH on WhatsApp"
              title="Official WhatsApp: 0327-0831470"
              className="w-9 h-9 rounded-full bg-slate-800 hover:bg-emerald-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors border border-slate-700 hover:border-emerald-500"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
              </svg>
            </a>
            <a
              href="mailto:waseem000094@gmail.com"
              aria-label="Send email to WATECH"
              title="Official Email: waseem000094@gmail.com"
              className="w-9 h-9 rounded-full bg-slate-800 hover:bg-[#2563EB] text-slate-300 hover:text-white flex items-center justify-center transition-colors border border-slate-700 hover:border-blue-500"
            >
              <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
            </a>
            <a
              href="https://waseemabbas.online"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit Founder Portfolio"
              title="Founder: waseemabbas.online"
              className="w-9 h-9 rounded-full bg-slate-800 hover:bg-purple-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors border border-slate-700 hover:border-purple-500"
            >
              <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" />
                <line x1="2" x2="22" y1="12" y2="12" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
            </a>
          </div>

          <div className="pt-2">
            <SocialIcons variant="footer" />
          </div>

          <div className="text-xs text-slate-500 pt-2">
            © {new Date().getFullYear()} Watech Solutions. All rights reserved.
          </div>
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-4">
            Three Journeys
          </h4>
          <ul className="space-y-2.5 text-sm">
            <li>
              <Link href="/services" className="hover:text-blue-400 transition-colors">
                Digital Services & Agency
              </Link>
            </li>
            <li>
              <Link href="/marketplace" className="hover:text-green-400 transition-colors">
                Marketplace (Products)
              </Link>
            </li>
            <li>
              <Link href="/partners" className="hover:text-orange-400 transition-colors">
                Partner Ecosystem (Free Join)
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-white transition-colors">
                About WATECH
              </Link>
            </li>
            <li>
              <Link href="/blog" className="hover:text-blue-400 transition-colors">
                Blog & Insights Hub
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-4">
            Marketplace Sectors
          </h4>
          <ul className="space-y-2.5 text-sm">
            <li>
              <Link href="/marketplace?tab=properties" className="hover:text-white transition-colors">
                Real Estate Listings
              </Link>
            </li>
            <li>
              <Link href="/marketplace?tab=furniture" className="hover:text-white transition-colors">
                Chinioti Handcrafted Wood
              </Link>
            </li>
            <li>
              <Link href="/marketplace?tab=food-catering" className="hover:text-white transition-colors">
                Food & Catering
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-4">
            Contact & Support
          </h4>
          <ul className="space-y-2 text-sm">
            <li>Lahore, Faisalabad & Islamabad, Pakistan</li>
            <li>
              <a href="mailto:waseem000094@gmail.com" className="hover:text-white transition-colors">
                waseem000094@gmail.com
              </a>
            </li>
            <li>
              <a
                href="https://waseemabbas.online"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                waseemabbas.online
              </a>
            </li>
            <li>
              <a
                href="https://wa.me/923270831470"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
              >
                Direct WhatsApp Support (0327-0831470) →
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

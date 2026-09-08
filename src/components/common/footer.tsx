import React from "react";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 py-16 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="space-y-4">
          <span className="text-2xl font-black tracking-tight text-white">
            WATECH<span className="text-[#2563EB]">.</span>
          </span>
          <p className="text-sm text-slate-400 leading-relaxed">
            Pakistan's integrated ecosystem connecting Real Estate, Chinioti Handcrafted Furniture, and Signature Events with modern technology.
          </p>
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
              <Link href="/marketplace?tab=events" className="hover:text-white transition-colors">
                Banquet Halls & Catering
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
              <a href="mailto:info@watechsolutions.com" className="hover:text-white transition-colors">
                info@watechsolutions.com
              </a>
            </li>
            <li>
              <a
                href="https://wa.me/923001234567"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
              >
                Direct WhatsApp Support →
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

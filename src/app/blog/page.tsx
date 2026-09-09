"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Search,
  BookOpen,
  Calendar,
  Clock,
  ArrowRight,
  TrendingUp,
  Building2,
  Armchair,
  PartyPopper,
  Megaphone,
  Cpu,
  Sparkles,
  ChevronRight,
} from "lucide-react";
import { INITIAL_BLOG_POSTS } from "@/lib/mock-data";
import { BlogCategory } from "@/types/database";

const CATEGORIES: { name: string; category: BlogCategory | "All"; icon: any }[] = [
  { name: "All Articles", category: "All", icon: BookOpen },
  { name: "Real Estate", category: "Real Estate", icon: Building2 },
  { name: "Furniture & Craft", category: "Furniture & Chinioti Craft", icon: Armchair },
  { name: "Events & Catering", category: "Events & Catering", icon: PartyPopper },
  { name: "Digital Marketing", category: "Digital Marketing", icon: Megaphone },
  { name: "AI & Automation", category: "AI & Automation", icon: Cpu },
  { name: "Business Growth", category: "Business Growth", icon: TrendingUp },
];

export default function BlogListingPage() {
  const [selectedCategory, setSelectedCategory] = useState<BlogCategory | "All">("All");
  const [searchQuery, setSearchQuery] = useState("");

  const featuredPost = useMemo(() => {
    return INITIAL_BLOG_POSTS.find((p) => p.isFeatured) || INITIAL_BLOG_POSTS[0];
  }, []);

  const filteredPosts = useMemo(() => {
    return INITIAL_BLOG_POSTS.filter((post) => {
      const matchesCategory =
        selectedCategory === "All" || post.category === selectedCategory;
      const matchesSearch =
        searchQuery.trim() === "" ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // If viewing all and no search query, exclude featured from standard grid to avoid duplicate visual
  const displayPosts = useMemo(() => {
    if (selectedCategory === "All" && searchQuery.trim() === "") {
      return filteredPosts.filter((p) => p.id !== featuredPost.id);
    }
    return filteredPosts;
  }, [filteredPosts, selectedCategory, searchQuery, featuredPost]);

  const getCategoryBadgeColor = (cat: BlogCategory) => {
    switch (cat) {
      case "Real Estate":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "Furniture & Chinioti Craft":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "Events & Catering":
        return "bg-purple-50 text-purple-700 border-purple-200";
      case "Digital Marketing":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "AI & Automation":
        return "bg-indigo-50 text-indigo-700 border-indigo-200";
      case "Business Growth":
        return "bg-orange-50 text-orange-700 border-orange-200";
      default:
        return "bg-slate-50 text-slate-700 border-slate-200";
    }
  };

  return (
    <div className="w-full bg-white text-slate-900 selection:bg-[#2563EB] selection:text-white min-h-screen">
      {/* HERO SECTION */}
      <section className="relative py-20 md:py-28 px-6 bg-gradient-to-b from-blue-50/40 via-white to-white border-b border-slate-100">
        <div className="max-w-5xl mx-auto text-center space-y-5">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100/60 border border-blue-200 text-xs font-bold uppercase tracking-wider text-[#2563EB]"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Watech Insights & Knowledge Hub</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 tracking-tight leading-[1.1]"
          >
            Insights for Pakistan's{" "}
            <span className="text-[#2563EB]">High-Growth</span> Businesses
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed"
          >
            Actionable strategies on Real Estate investments, Chinioti furniture craftsmanship, event planning, and modern digital marketing in Pakistan.
          </motion.p>

          {/* SEARCH BAR */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="pt-4 max-w-xl mx-auto"
          >
            <div className="relative flex items-center">
              <Search className="absolute left-4 w-5 h-5 text-slate-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Search articles, topics, or keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-slate-200 bg-white/90 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent text-sm transition-all placeholder:text-slate-400"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 text-xs text-slate-400 hover:text-slate-600 px-2 py-1 rounded bg-slate-100"
                >
                  Clear
                </button>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* MAIN CONTENT AREA */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* CATEGORY FILTER PILLS */}
        <div className="flex items-center gap-2.5 overflow-x-auto pb-4 scrollbar-none border-b border-slate-100 mb-12">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.category;
            return (
              <button
                key={cat.name}
                onClick={() => setSelectedCategory(cat.category)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  isSelected
                    ? "bg-slate-900 text-white shadow-md"
                    : "bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-slate-200/60"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>

        {/* FEATURED POST BANNER (Shown when viewing 'All' and no search query) */}
        {selectedCategory === "All" && searchQuery.trim() === "" && featuredPost && (
          <div className="mb-16">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
              <Sparkles className="w-3.5 h-3.5 text-[#2563EB]" />
              <span>Featured Story</span>
            </div>

            <Link
              href={`/blog/${featuredPost.slug}`}
              className="group block bg-slate-50 rounded-3xl overflow-hidden border border-slate-200/80 hover:border-slate-300 transition-all hover:shadow-xl duration-300"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                <div className="lg:col-span-7 relative h-72 lg:h-[420px] overflow-hidden">
                  <Image
                    src={featuredPost.featuredImage}
                    alt={featuredPost.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    priority
                  />
                  <div className="absolute top-4 left-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold border backdrop-blur-md bg-white/90 ${getCategoryBadgeColor(
                        featuredPost.category
                      )}`}
                    >
                      {featuredPost.category}
                    </span>
                  </div>
                </div>

                <div className="lg:col-span-5 p-8 lg:p-12 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {featuredPost.publishedAt}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {featuredPost.readingTime}
                      </span>
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-snug group-hover:text-[#2563EB] transition-colors">
                      {featuredPost.title}
                    </h2>

                    <p className="text-sm sm:text-base text-slate-600 line-clamp-3 leading-relaxed">
                      {featuredPost.excerpt}
                    </p>
                  </div>

                  <div className="pt-8 border-t border-slate-200/70 flex items-center justify-between mt-6">
                    <div className="flex items-center gap-3">
                      <div className="relative w-10 h-10 rounded-full overflow-hidden border border-slate-200">
                        <Image
                          src={featuredPost.author.avatar}
                          alt={featuredPost.author.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900">
                          {featuredPost.author.name}
                        </div>
                        <div className="text-[11px] text-slate-500">
                          {featuredPost.author.role}
                        </div>
                      </div>
                    </div>

                    <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#2563EB] group-hover:translate-x-1 transition-transform">
                      <span>Read Article</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* ARTICLES GRID */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              {selectedCategory === "All"
                ? "Recent Articles"
                : `${selectedCategory} Articles`}
            </h2>
            <span className="text-xs font-semibold text-slate-500">
              Showing {displayPosts.length} article
              {displayPosts.length === 1 ? "" : "s"}
            </span>
          </div>

          {displayPosts.length === 0 ? (
            <div className="text-center py-20 bg-slate-50 rounded-3xl border border-slate-200/80">
              <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="text-base font-bold text-slate-800">No articles found</h3>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                No articles match your query "{searchQuery}". Try selecting another category or clear your search filter.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory("All");
                  setSearchQuery("");
                }}
                className="mt-4 px-4 py-2 rounded-full text-xs font-semibold bg-slate-900 text-white hover:bg-slate-800 transition-colors"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayPosts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col bg-white rounded-3xl overflow-hidden border border-slate-200/80 hover:border-slate-300 transition-all hover:shadow-lg duration-300"
                >
                  <div className="relative h-56 w-full overflow-hidden bg-slate-100">
                    <Image
                      src={post.featuredImage}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold border backdrop-blur-md bg-white/95 ${getCategoryBadgeColor(
                          post.category
                        )}`}
                      >
                        {post.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2.5 text-[11px] text-slate-500">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {post.publishedAt}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {post.readingTime}
                        </span>
                      </div>

                      <h3 className="text-lg font-bold text-slate-900 tracking-tight leading-snug group-hover:text-[#2563EB] transition-colors line-clamp-2">
                        {post.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed">
                        {post.excerpt}
                      </p>
                    </div>

                    <div className="pt-6 border-t border-slate-100 flex items-center justify-between mt-6">
                      <div className="flex items-center gap-2.5">
                        <div className="relative w-7 h-7 rounded-full overflow-hidden border border-slate-200">
                          <Image
                            src={post.author.avatar}
                            alt={post.author.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <span className="text-xs font-semibold text-slate-800">
                          {post.author.name}
                        </span>
                      </div>

                      <span className="inline-flex items-center gap-1 text-xs font-bold text-[#2563EB] group-hover:translate-x-1 transition-transform">
                        Read
                        <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* BOTTOM NEWSLETTER / CTA BANNER */}
        <div className="mt-20 p-8 sm:p-12 rounded-3xl bg-slate-900 text-white relative overflow-hidden">
          <div className="relative z-10 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
              Watech Growth Community
            </span>
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight mt-2 text-white">
              Stay ahead in Pakistan's multi-sector markets
            </h3>
            <p className="text-sm text-slate-300 mt-3 leading-relaxed">
              Join thousands of investors, furniture enthusiasts, event organizers, and agency partners receiving weekly verified market insights and investment opportunities.
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <Link
                href="/services#contact"
                className="px-6 py-3 rounded-full bg-[#2563EB] text-white text-xs font-bold uppercase tracking-wider hover:bg-blue-700 transition-colors"
              >
                Consult Our Growth Experts
              </Link>
              <Link
                href="/partners"
                className="px-6 py-3 rounded-full bg-slate-800 text-white text-xs font-bold uppercase tracking-wider hover:bg-slate-700 transition-colors border border-slate-700"
              >
                Join As Verified Partner
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
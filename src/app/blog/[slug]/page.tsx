import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  Calendar,
  Clock,
  ArrowLeft,
  ArrowUpRight,
  Share2,
  Tag,
  CheckCircle2,
  MessageCircle,
  Building2,
  Armchair,
  PartyPopper,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import {
  INITIAL_BLOG_POSTS,
  getBlogPostBySlug,
  getRelatedBlogPosts,
} from "@/lib/mock-data";
import { BlogPost, BlogCategory } from "@/types/database";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return INITIAL_BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: "Article Not Found | Watech Insights",
      description: "The requested article could not be found.",
    };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.waseemabbas.online";
  const postUrl = `${siteUrl}/blog/${post.slug}`;

  return {
    title: `${post.title} | Watech Insights`,
    description: post.excerpt,
    keywords: post.tags.join(", "),
    authors: [{ name: post.author.name }],
    alternates: {
      canonical: postUrl,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: postUrl,
      siteName: "Watech Solutions Platform",
      images: [
        {
          url: post.featuredImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      type: "article",
      publishedTime: post.publishedAt,
      authors: [post.author.name],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.featuredImage],
    },
  };
}

export default async function BlogPostDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedBlogPosts(post.slug, post.category, 3);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.waseemabbas.online";
  const postUrl = `${siteUrl}/blog/${post.slug}`;

  // Article & BreadcrumbList JSON-LD Structured Data
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${postUrl}/#article`,
        headline: post.title,
        description: post.excerpt,
        image: post.featuredImage,
        datePublished: post.publishedAt,
        dateModified: post.publishedAt,
        author: {
          "@type": "Person",
          name: post.author.name,
          jobTitle: post.author.role,
        },
        publisher: {
          "@type": "Organization",
          name: "Watech Solutions",
          logo: {
            "@type": "ImageObject",
            url: `${siteUrl}/favicon.ico`,
          },
        },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": postUrl,
        },
        keywords: post.tags.join(", "),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: siteUrl,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Blog",
            item: `${siteUrl}/blog`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: post.category,
            item: `${siteUrl}/blog`,
          },
          {
            "@type": "ListItem",
            position: 4,
            name: post.title,
            item: postUrl,
          },
        ],
      },
    ],
  };

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

  const encodedWhatsAppUrl = `https://wa.me/923270831470?text=${encodeURIComponent(
    post.cta.whatsappMessage
  )}`;

  return (
    <article className="w-full bg-white text-slate-900 selection:bg-[#2563EB] selection:text-white min-h-screen">
      {/* INJECT JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* HEADER / BREADCRUMB */}
      <div className="border-b border-slate-100 bg-slate-50/50 py-4">
        <div className="max-w-4xl mx-auto px-6 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <Link href="/" className="hover:text-slate-900 transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <Link href="/blog" className="hover:text-slate-900 transition-colors">
              Blog
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-800 font-medium truncate max-w-[200px] sm:max-w-none">
              {post.category}
            </span>
          </div>

          <Link
            href="/blog"
            className="inline-flex items-center gap-1 text-slate-600 hover:text-slate-900 font-semibold"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>All Articles</span>
          </Link>
        </div>
      </div>

      {/* ARTICLE HERO */}
      <header className="max-w-4xl mx-auto px-6 pt-12 pb-8">
        <div className="space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold border ${getCategoryBadgeColor(
                post.category
              )}`}
            >
              {post.category}
            </span>
            <div className="flex items-center gap-3 text-xs text-slate-500">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {post.publishedAt}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {post.readingTime}
              </span>
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-[1.15]">
            {post.title}
          </h1>

          <p className="text-lg text-slate-600 leading-relaxed font-normal">
            {post.excerpt}
          </p>

          {/* AUTHOR BAR */}
          <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-3.5">
              <div className="relative w-12 h-12 rounded-full overflow-hidden border border-slate-200">
                <Image
                  src={post.author.avatar}
                  alt={post.author.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <div className="text-sm font-bold text-slate-900">
                  {post.author.name}
                </div>
                <div className="text-xs text-slate-500">
                  {post.author.role} • Watech Research
                </div>
              </div>
            </div>

            <a
              href={encodedWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 text-xs font-bold transition-colors"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              <span className="hidden sm:inline">Ask on WhatsApp</span>
              <span className="sm:hidden">WhatsApp</span>
            </a>
          </div>
        </div>
      </header>

      {/* FEATURED IMAGE */}
      <div className="max-w-4xl mx-auto px-6 mb-12">
        <div className="relative h-[320px] sm:h-[450px] w-full rounded-3xl overflow-hidden shadow-sm border border-slate-200/80">
          <Image
            src={post.featuredImage}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>

      {/* ARTICLE BODY & SIDEBAR LAYOUT */}
      <div className="max-w-4xl mx-auto px-6 pb-20">
        <div className="prose prose-slate max-w-none prose-headings:font-black prose-headings:tracking-tight prose-h2:text-2xl prose-h2:sm:text-3xl prose-h2:mt-10 prose-h2:mb-4 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3 prose-p:text-slate-600 prose-p:leading-relaxed prose-p:text-base prose-p:sm:text-lg prose-li:text-slate-600 prose-strong:text-slate-900 prose-hr:my-8 prose-hr:border-slate-200">
          {/* RENDER CONTENT PARAGRAPHS */}
          {post.content.split("\n\n").map((chunk, idx) => {
            const trimmed = chunk.trim();
            if (!trimmed) return null;

            // Heading 2
            if (trimmed.startsWith("## ")) {
              return (
                <h2
                  key={idx}
                  className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-10 mb-4 pb-2 border-b border-slate-100"
                >
                  {trimmed.replace("## ", "")}
                </h2>
              );
            }

            // Heading 3
            if (trimmed.startsWith("### ")) {
              return (
                <h3
                  key={idx}
                  className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mt-8 mb-3"
                >
                  {trimmed.replace("### ", "")}
                </h3>
              );
            }

            // Horizontal Rule
            if (trimmed === "---") {
              return <hr key={idx} className="my-8 border-slate-200" />;
            }

            // List item bullet
            if (trimmed.startsWith("- ")) {
              const items = trimmed.split("\n").map((line) => line.replace(/^- \s*/, ""));
              return (
                <ul key={idx} className="space-y-2.5 my-4 list-disc pl-6 text-slate-700">
                  {items.map((it, i) => (
                    <li key={i} className="text-base sm:text-lg leading-relaxed">
                      {it}
                    </li>
                  ))}
                </ul>
              );
            }

            // Standard Paragraph
            return (
              <p
                key={idx}
                className="text-base sm:text-lg text-slate-600 leading-relaxed my-4"
              >
                {trimmed}
              </p>
            );
          })}
        </div>

        {/* TAGS CLOUD */}
        <div className="pt-10 mt-12 border-t border-slate-200 flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 mr-2">
            <Tag className="w-3.5 h-3.5" />
            Tags:
          </span>
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200/80"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* CONVERSION CTA BOX */}
        <div className="mt-14 p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 text-white shadow-xl relative overflow-hidden">
          <div className="relative z-10 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Recommended Next Step</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              {post.cta.title}
            </h3>

            <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
              {post.cta.description}
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Link
                href={post.cta.buttonLink}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#2563EB] text-white text-xs font-bold uppercase tracking-wider hover:bg-blue-700 transition-all hover:shadow-lg"
              >
                <span>{post.cta.buttonText}</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>

              <a
                href={encodedWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-emerald-600 text-white text-xs font-bold uppercase tracking-wider hover:bg-emerald-700 transition-all hover:shadow-lg"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Discuss on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        {/* RELATED ARTICLES SECTION */}
        {relatedPosts.length > 0 && (
          <div className="mt-20 pt-16 border-t border-slate-200">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#2563EB]">
                  Keep Reading
                </span>
                <h3 className="text-2xl font-black text-slate-900 tracking-tight mt-1">
                  Related Insights
                </h3>
              </div>
              <Link
                href="/blog"
                className="text-xs font-bold text-slate-600 hover:text-slate-900"
              >
                View all articles →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((rPost) => (
                <Link
                  key={rPost.id}
                  href={`/blog/${rPost.slug}`}
                  className="group flex flex-col bg-slate-50 rounded-2xl overflow-hidden border border-slate-200/80 hover:border-slate-300 transition-all hover:shadow-md"
                >
                  <div className="relative h-40 w-full overflow-hidden bg-slate-200">
                    <Image
                      src={rPost.featuredImage}
                      alt={rPost.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2.5 left-2.5">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border backdrop-blur-md bg-white/90 ${getCategoryBadgeColor(
                          rPost.category
                        )}`}
                      >
                        {rPost.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="text-[11px] text-slate-500 mb-2">
                        {rPost.readingTime} • {rPost.publishedAt}
                      </div>
                      <h4 className="text-sm font-bold text-slate-900 tracking-tight leading-snug group-hover:text-[#2563EB] transition-colors line-clamp-2">
                        {rPost.title}
                      </h4>
                    </div>

                    <div className="pt-3 border-t border-slate-200/60 flex items-center justify-between mt-4">
                      <span className="text-xs text-slate-600">
                        {rPost.author.name}
                      </span>
                      <span className="text-xs font-bold text-[#2563EB]">
                        Read →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
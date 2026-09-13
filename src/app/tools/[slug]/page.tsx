import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { TOOLS_REGISTRY } from '@/data/toolsRegistry';
import ToolLayout from '@/components/tools/ToolLayout';
import InteractiveToolRenderer from '@/components/tools/InteractiveToolRenderer';

interface ToolPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate static routes for all 100 tools for lightning speed and SEO
export async function generateStaticParams() {
  return TOOLS_REGISTRY.map((tool) => ({
    slug: tool.slug
  }));
}

// Dynamic Google SEO metadata and Schema for every tool
export async function generateMetadata({ params }: ToolPageProps): Promise<Metadata> {
  const { slug } = await params;
  const tool = TOOLS_REGISTRY.find((t) => t.slug === slug);

  if (!tool) {
    return {
      title: 'Tool Not Found | WATECH Solutions',
      description: 'The requested free tool was not found.'
    };
  }

  const title = `${tool.title} (${tool.urduTitle}) | Free Tool - WATECH`;
  const description = `${tool.description} 100% Free online tool tailored for Pakistan by WATECH Solutions.`;

  return {
    title,
    description,
    keywords: [...tool.tags, ...tool.searchKeywords, 'Pakistan Free Tools', 'Watech Solutions'],
    openGraph: {
      title,
      description,
      type: 'website',
      url: `https://www.waseemabbas.online/tools/${tool.slug}`,
      siteName: 'WATECH Solutions Ecosystem'
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description
    }
  };
}

export default async function ToolPage({ params }: ToolPageProps) {
  const { slug } = await params;
  const tool = TOOLS_REGISTRY.find((t) => t.slug === slug);

  if (!tool) {
    notFound();
  }

  // JSON-LD SoftwareApplication Schema for Google SERP Rich Snippet
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: tool.title,
    operatingSystem: 'All',
    applicationCategory: 'BusinessApplication',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'PKR'
    },
    description: tool.description,
    url: `https://www.waseemabbas.online/tools/${tool.slug}`,
    author: {
      '@type': 'Organization',
      name: 'WATECH Solutions',
      url: 'https://www.waseemabbas.online'
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ToolLayout tool={tool}>
        <InteractiveToolRenderer tool={tool} />
      </ToolLayout>
    </>
  );
}

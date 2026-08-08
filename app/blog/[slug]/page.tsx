import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/sections/PageHero";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { blogPosts, getPostBySlug } from "@/lib/data/blog";
import { site } from "@/lib/data/site";

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = getPostBySlug(params.slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
  };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: { "@type": "Organization", name: site.name },
  };

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <PageHero
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Insights", href: "/blog" },
          { label: post.title, href: `/blog/${post.slug}` },
        ]}
        eyebrow={`${post.category} · ${post.readTime}`}
        title={post.title}
      />
      <section className="bg-background py-16 lg:py-24">
        <Container className="max-w-2xl">
          <Reveal className="space-y-6">
            {post.content.map((paragraph, i) => (
              <p key={i} className="text-[17px] leading-relaxed text-foreground/90">
                {paragraph}
              </p>
            ))}
          </Reveal>
        </Container>
      </section>
      <FinalCTA />
    </>
  );
}

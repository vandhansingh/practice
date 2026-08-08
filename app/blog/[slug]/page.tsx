import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Container } from "@/components/ui/Container";
import { ArchitecturalImage } from "@/components/visuals/ArchitecturalImage";
import { blogPosts, getPostBySlug } from "@/lib/data/blog";
import { site } from "@/lib/data/site";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = getPostBySlug(params.slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      publishedTime: post.date,
    },
  };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  const index = blogPosts.findIndex((p) => p.slug === post.slug);
  const next = blogPosts[(index + 1) % blogPosts.length];

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    articleSection: post.category,
    author: { "@type": "Organization", name: site.name },
    publisher: { "@type": "Organization", name: site.name },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <PageHero
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: post.category, href: "/blog" },
        ]}
        label={`${post.category} — ${post.readTime}`}
        lines={[post.title]}
        standfirst={post.excerpt}
      />

      <section className="bg-charcoal">
        <Container>
          <div data-image-reveal data-image-mask className="aspect-[21/9] w-full">
            <div className="h-full w-full">
              <ArchitecturalImage
                uid={`post-hero-${post.slug}`}
                tone={post.tone}
                motif={post.motif}
                className="h-full w-full"
                label={post.title}
              />
            </div>
          </div>
        </Container>
        <div className="h-24 lg:h-28" />
      </section>

      <article className="bg-cream py-24 lg:py-28">
        <Container narrow>
          <div className="flex flex-col gap-12">
            {post.body.map((section, i) => (
              <section key={section.heading ?? i} data-reveal>
                {section.heading && (
                  <h2 className="mb-6 font-display text-display-sm text-charcoal">
                    {section.heading}
                  </h2>
                )}
                <div className="space-y-6">
                  {section.paragraphs.map((paragraph, j) => (
                    <p
                      key={paragraph}
                      className={
                        i === 0 && j === 0
                          ? "font-display text-display-sm leading-snug text-charcoal"
                          : "text-[1.125rem] leading-[1.75] text-charcoal/85"
                      }
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <div className="mt-20 border-t border-border pt-8">
            <p className="text-[0.8125rem] text-muted">
              {new Date(post.date).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
              {" — "}
              {site.name}
            </p>
          </div>
        </Container>
      </article>

      <section className="bg-cream-dark py-20 lg:py-24">
        <Container>
          <Link
            href={`/blog/${next.slug}`}
            data-hover-card
            className="group flex flex-col justify-between gap-6 border-t border-border pt-8 sm:flex-row sm:items-end"
          >
            <div>
              <p className="text-label uppercase text-muted">Read next</p>
              <h2 className="mt-4 max-w-[30ch] font-display text-display-md text-charcoal">
                {next.title}
              </h2>
            </div>
            <span data-hover-arrow className="text-charcoal">
              <ArrowUpRight size={24} strokeWidth={1.5} aria-hidden="true" />
            </span>
          </Link>
        </Container>
      </section>

      <FinalCTA />
    </>
  );
}

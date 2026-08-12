import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Container } from "@/components/ui/Container";
import { Label } from "@/components/ui/Label";
import { BrandImage } from "@/components/visuals/BrandImage";
import { featuredPost, otherPosts } from "@/lib/data/blog";

export const metadata: Metadata = {
  title: "Journal",
  description:
    "Notes on design, build and growth — written for the people who have to live with the result.",
  alternates: { canonical: "/blog" },
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function BlogPage() {
  const lead = featuredPost();
  const rest = otherPosts();

  return (
    <>
      <PageHero
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Journal", href: "/blog" },
        ]}
        label="Journal"
        lines={["Notes from", "the studio."]}
        standfirst="Short, specific pieces on design, build and growth — written for clients rather than for search engines."
      />

      {/* Featured article */}
      <section className="bg-cream py-24 lg:py-32">
        <Container>
          <Label className="mb-10">Latest</Label>

          <article data-reveal>
            <Link
              href={`/blog/${lead.slug}`}
              data-hover-card
              className="group grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12"
            >
              <div className="lg:col-span-7">
                <div data-hover-image>
                  <BrandImage
            slot={lead.slot}
            underlay="block"
            aspect="aspect-[16/10]"
            alt={lead.title}
          />
                </div>
              </div>

              <div className="flex flex-col justify-center lg:col-span-5">
                <p className="text-label uppercase text-muted">
                  {lead.category} — {lead.readTime}
                </p>
                <h2
                  data-hover-shift
                  className="mt-5 max-w-[26ch] font-display text-display-lg text-charcoal"
                >
                  {lead.title}
                </h2>
                <p className="mt-6 max-w-[46ch] text-[1.0625rem] leading-relaxed text-muted">
                  {lead.excerpt}
                </p>
                <p className="mt-8 flex items-center gap-3 text-[0.875rem] font-medium text-charcoal">
                  Read the piece
                  <span data-hover-arrow>
                    <ArrowUpRight size={16} aria-hidden="true" />
                  </span>
                </p>
              </div>
            </Link>
          </article>
        </Container>
      </section>

      {/* Archive */}
      <section className="border-t border-border bg-cream-dark py-24 lg:py-32">
        <Container>
          <Label className="mb-12">More writing</Label>

          <div data-reveal-group className="flex flex-col">
            {rest.map((post) => (
              <article key={post.slug} data-reveal>
                <Link
                  href={`/blog/${post.slug}`}
                  data-hover-card
                  className="group grid grid-cols-1 items-baseline gap-4 border-t border-border py-9 sm:grid-cols-12 sm:gap-8"
                >
                  <div className="sm:col-span-2">
                    <p className="text-label uppercase text-muted">{post.category}</p>
                  </div>

                  <div className="sm:col-span-7">
                    <h3
                      data-hover-shift
                      className="max-w-[36ch] font-display text-display-sm text-charcoal"
                    >
                      {post.title}
                    </h3>
                    <p className="mt-3 max-w-[52ch] text-[0.9375rem] leading-relaxed text-muted">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="flex items-center justify-between gap-6 sm:col-span-3 sm:justify-end">
                    <span className="text-[0.8125rem] text-muted">{formatDate(post.date)}</span>
                    <span data-hover-arrow className="text-charcoal">
                      <ArrowUpRight size={18} strokeWidth={1.75} aria-hidden="true" />
                    </span>
                  </div>
                </Link>
              </article>
            ))}
            <div className="border-t border-border" />
          </div>
        </Container>
      </section>

      <FinalCTA />
    </>
  );
}

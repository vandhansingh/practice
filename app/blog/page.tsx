import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { blogPosts } from "@/lib/data/blog";

export const metadata: Metadata = {
  title: "Insights",
  description: "Notes on automation, operations and building systems that last, from the Halyard team.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  return (
    <>
      <PageHero
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Insights", href: "/blog" }]}
        eyebrow="Insights"
        title="Notes on operations, automation and systems."
        description="Short, specific write-ups from engagements and the patterns we keep seeing across them."
      />
      <section className="bg-background py-20 lg:py-28">
        <Container className="max-w-3xl">
          <div className="border-t border-border">
            {blogPosts.map((post, i) => (
              <Reveal key={post.slug} delay={i * 70}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col justify-between gap-3 border-b border-border py-8 sm:flex-row sm:items-center sm:gap-8"
                >
                  <div>
                    <p className="text-[12px] font-semibold uppercase tracking-label text-muted">
                      {post.category} · {post.readTime}
                    </p>
                    <h2 className="mt-2 text-balance text-[20px] font-medium tracking-tightest text-foreground">
                      {post.title}
                    </h2>
                    <p className="mt-2 max-w-lg text-[14px] leading-relaxed text-muted">
                      {post.excerpt}
                    </p>
                  </div>
                  <ArrowUpRight
                    size={20}
                    className="shrink-0 text-foreground transition-transform duration-500 ease-power3-out group-hover:translate-x-1 group-hover:-translate-y-1"
                  />
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}

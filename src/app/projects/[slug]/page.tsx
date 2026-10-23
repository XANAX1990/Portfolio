import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/data/projects";
import { Button } from "@/components/ui/Button";
import { Tag } from "@/components/ui/Tag";
import { isUrl } from "@/lib/links";

const focus =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

// Cache Components forbids `dynamicParams`; unknown slugs are rejected with notFound() below.
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return { title: project.title, description: project.tagline };
}

function Block({ heading, children }: { heading: string; children: React.ReactNode }) {
  return (
    <section className="mt-12">
      <h2 className="mb-4 text-xl font-semibold">{heading}</h2>
      {children}
    </section>
  );
}

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) notFound();

  const project = projects[index];
  const next = projects[(index + 1) % projects.length];
  const { live, repo } = project.links;

  return (
    <article className="py-12 sm:py-16">
      <Link href="/#projects" className={`text-sm text-muted hover:text-foreground ${focus}`}>
        ← All projects
      </Link>

      <h1 className="mt-6 text-3xl font-bold tracking-tight sm:text-5xl">{project.title}</h1>
      <p className="mt-4 max-w-2xl text-lg text-muted">{project.tagline}</p>
      {(isUrl(live) || isUrl(repo)) && (
        <div className="mt-6 flex flex-wrap gap-3">
          {isUrl(live) && (
            <Button href={live} variant="primary" external>
              Live site
            </Button>
          )}
          {isUrl(repo) && (
            <Button href={repo} external>
              Source code
            </Button>
          )}
        </div>
      )}

      <div className="relative mt-10 aspect-[1200/630] w-full overflow-hidden rounded-xl border border-border bg-surface">
        <Image
          src={project.cover}
          alt={`${project.title} cover`}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 1024px"
          className="object-cover"
        />
      </div>

      <Block heading="Problem">
        <p className="max-w-3xl text-muted">{project.problem}</p>
      </Block>
      <Block heading="Solution">
        <p className="max-w-3xl text-muted">{project.solution}</p>
      </Block>
      <Block heading="Highlights">
        <ul className="max-w-3xl list-disc space-y-2 pl-5 text-muted marker:text-accent">
          {project.highlights.map((h) => (
            <li key={h}>{h}</li>
          ))}
        </ul>
      </Block>
      <Block heading="Lessons learned">
        <ul className="max-w-3xl list-disc space-y-2 pl-5 text-muted marker:text-accent">
          {project.lessons.map((l) => (
            <li key={l}>{l}</li>
          ))}
        </ul>
      </Block>

      {project.gallery && project.gallery.length > 0 && (
        <Block heading="Gallery">
          <ul className="grid gap-4 sm:grid-cols-2">
            {project.gallery.map((g) => (
              <li
                key={g.src}
                className="relative aspect-video overflow-hidden rounded-xl border border-border bg-surface"
              >
                <Image
                  src={g.src}
                  alt={g.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, 512px"
                  className="object-cover"
                />
              </li>
            ))}
          </ul>
        </Block>
      )}

      <Block heading="Stack">
        <ul className="flex flex-wrap gap-2">
          {project.stack.map((s) => (
            <Tag key={s}>{s}</Tag>
          ))}
        </ul>
      </Block>

      {next.slug !== project.slug && (
        <nav aria-label="Next project" className="mt-16 border-t border-border pt-8">
          <p className="text-sm text-muted">Next project</p>
          <Link
            href={`/projects/${next.slug}`}
            className={`mt-1 inline-block text-xl font-semibold hover:text-accent ${focus}`}
          >
            {next.title} →
          </Link>
        </nav>
      )}
    </article>
  );
}

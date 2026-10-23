import Link from "next/link";
import { projects } from "@/data/projects";
import { Section } from "@/components/ui/Section";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { Tag } from "@/components/ui/Tag";

export function Projects() {
  const featured = projects.filter((p) => p.featured);
  const other = projects.filter((p) => !p.featured);
  return (
    <Section id="projects" heading="Projects">
      <div className="grid gap-6 md:grid-cols-2">
        {featured.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </div>
      {other.length > 0 && (
        <div className="mt-12">
          <h3 className="mb-4 text-lg font-semibold">Other projects</h3>
          <ul className="divide-y divide-border rounded-xl border border-border">
            {other.map((p) => (
              <li
                key={p.slug}
                className="flex flex-col gap-2 p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <Link
                    href={`/projects/${p.slug}`}
                    className="font-medium hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                  >
                    {p.title}
                  </Link>
                  <p className="text-sm text-muted">{p.tagline}</p>
                </div>
                <ul className="flex flex-wrap gap-2" aria-label="Tech stack">
                  {p.stack.slice(0, 3).map((s) => (
                    <Tag key={s}>{s}</Tag>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      )}
    </Section>
  );
}

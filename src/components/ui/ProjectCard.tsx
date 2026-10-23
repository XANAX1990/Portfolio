import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/data/projects";
import { isUrl } from "@/lib/links";
import { Tag } from "./Tag";

const ext =
  "relative z-10 text-sm text-accent underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

export function ProjectCard({ project }: { project: Project }) {
  const { live, repo } = project.links;
  return (
    <article className="group relative h-full flex flex-col overflow-hidden rounded-xl border border-border bg-surface transition-[border-color,transform] motion-safe:hover:-translate-y-1 hover:border-accent/60">
      <div className="relative aspect-[1200/630] w-full bg-background">
        <Image
          src={project.cover}
          alt={`${project.title} cover`}
          fill
          sizes="(max-width: 768px) 100vw, 576px"
          className="object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col gap-4 p-5">
        <div>
          <h3 className="text-lg font-semibold">
            {/* stretched link: the whole card is clickable; external links sit above it */}
            <Link
              href={`/projects/${project.slug}`}
              className="after:absolute after:inset-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              {project.title}
            </Link>
          </h3>
          <p className="mt-1 text-sm text-muted">{project.tagline}</p>
        </div>
        <ul className="flex flex-wrap gap-2" aria-label="Tech stack">
          {project.stack.map((s) => (
            <Tag key={s}>{s}</Tag>
          ))}
        </ul>
        {(isUrl(live) || isUrl(repo)) && (
          <div className="mt-auto flex gap-4">
            {isUrl(live) && (
              <a href={live} className={ext} target="_blank" rel="noopener noreferrer">
                Live site
              </a>
            )}
            {isUrl(repo) && (
              <a href={repo} className={ext} target="_blank" rel="noopener noreferrer">
                Source
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  );
}

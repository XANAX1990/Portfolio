import { existsSync } from "node:fs";
import { join } from "node:path";
import { profile } from "@/data/profile";
import { Button } from "@/components/ui/Button";
import { isUrl } from "@/lib/links";

// The Resume button only appears once public/resume.pdf exists, so it never links to a 404.
const hasResume = existsSync(join(process.cwd(), "public", profile.resume));

export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-heading" className="py-20 sm:py-32">
      <p className="mb-3 font-mono text-sm text-accent">{profile.role}</p>
      <h1 id="hero-heading" className="text-4xl font-bold tracking-tight sm:text-6xl">
        {profile.name}
      </h1>
      <p className="mt-6 max-w-2xl text-lg text-muted">{profile.bio}</p>
      <div className="mt-8 flex flex-wrap gap-3">
        {hasResume && (
          <Button href={profile.resume} variant="primary" external>
            Resume (PDF)
          </Button>
        )}
        {isUrl(profile.github) && (
          <Button href={profile.github} external>
            GitHub
          </Button>
        )}
        <Button href="/#contact" variant={hasResume ? "secondary" : "primary"}>
          Contact
        </Button>
      </div>
    </section>
  );
}

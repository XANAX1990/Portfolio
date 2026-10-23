import { profile } from "@/data/profile";
import { isUrl } from "@/lib/links";

// Cache Components rejects a bare new Date() while prerendering; cache it instead.
async function Year() {
  "use cache";
  return new Date().getFullYear();
}

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-5xl flex-col gap-2 px-4 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>
          © <Year /> {profile.name}
        </p>
        <p>
          Built with{" "}
          <a
            href="https://nextjs.org"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            Next.js
          </a>
          {isUrl(profile.siteRepo) && (
            <>
              {" · "}
              <a
                href={profile.siteRepo}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                Source
              </a>
            </>
          )}
        </p>
      </div>
    </footer>
  );
}

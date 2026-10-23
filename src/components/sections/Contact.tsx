import { profile } from "@/data/profile";
import { Section } from "@/components/ui/Section";
import { isUrl } from "@/lib/links";

const link =
  "text-accent underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

export function Contact() {
  return (
    <Section id="contact" heading="Contact">
      <ul className="space-y-3">
        <li>
          Email:{" "}
          <a href={`mailto:${profile.email}`} className={link}>
            {profile.email}
          </a>
        </li>
        <li>
          Email 2:{" "}
          <a href={`mailto:${profile.email2}`} className={link}>
            {profile.email2}
          </a>
        </li>
        {isUrl(profile.github) && (
          <li>
            GitHub:{" "}
            <a href={profile.github} className={link} target="_blank" rel="noopener noreferrer">
              {profile.github.replace(/^https?:\/\//, "")}
            </a>
          </li>
        )}
      </ul>
    </Section>
  );
}

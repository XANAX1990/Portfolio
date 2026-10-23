import { profile } from "@/data/profile";
import { Section } from "@/components/ui/Section";

export function About() {
  return (
    <Section id="about" heading="About">
      <div className="max-w-2xl space-y-4 text-muted">
        {profile.about.map((line) => (
          <p key={line}>{line}</p>
        ))}
        <p className="text-sm">{profile.location}</p>
      </div>
    </Section>
  );
}

import { profile } from "@/data/profile";
import { Section } from "@/components/ui/Section";
import { Tag } from "@/components/ui/Tag";

export function Skills() {
  return (
    <Section id="skills" heading="Skills">
      <div className="grid gap-8 sm:grid-cols-2">
        {Object.entries(profile.skills).map(([group, items]) => (
          <div key={group}>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted">
              {group}
            </h3>
            <ul className="flex flex-wrap gap-2">
              {items.map((s) => (
                <Tag key={s}>{s}</Tag>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}

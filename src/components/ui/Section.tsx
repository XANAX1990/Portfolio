import { Reveal } from "./Reveal";

export function Section({
  id,
  heading,
  children,
}: {
  id: string;
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className="scroll-mt-20 py-16 sm:py-24"
    >
      <h2
        id={`${id}-heading`}
        className="mb-8 text-2xl font-semibold tracking-tight sm:text-3xl"
      >
        {heading}
      </h2>
      <Reveal>{children}</Reveal>
    </section>
  );
}

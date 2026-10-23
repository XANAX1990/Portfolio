const base =
  "inline-flex h-11 items-center justify-center rounded-full px-5 text-sm font-medium transition-[color,background-color,filter,transform] active:scale-95 motion-reduce:active:scale-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";
const variants = {
  primary: "bg-accent text-background hover:brightness-110",
  secondary: "border border-border text-foreground hover:bg-surface",
};

export function Button({
  href,
  variant = "secondary",
  external,
  children,
}: {
  href: string;
  variant?: keyof typeof variants;
  external?: boolean;
  children: React.ReactNode;
}) {
  const cls = `${base} ${variants[variant]}`;
  return external ? (
    <a href={href} className={cls} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  ) : (
    <a href={href} className={cls}>
      {children}
    </a>
  );
}

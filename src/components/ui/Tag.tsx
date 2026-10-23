export function Tag({ children }: { children: React.ReactNode }) {
  return (
    <li className="rounded-full border border-border bg-surface px-3 py-1 text-xs text-muted">
      {children}
    </li>
  );
}

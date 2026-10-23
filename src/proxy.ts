import { NextResponse, type NextRequest } from "next/server";
import { projects } from "@/data/projects";

const slugs = new Set(projects.map((p) => p.slug));

// With Cache Components a notFound() inside /projects/[slug] answers 200 (the shell is
// already streaming), so unknown slugs are rejected here with a real 404 instead.
export function proxy(request: NextRequest) {
  const slug = request.nextUrl.pathname.split("/")[2];
  if (slugs.has(slug)) return NextResponse.next();
  return NextResponse.rewrite(new URL("/_not-found", request.url), { status: 404 });
}

export const config = {
  matcher: "/projects/:slug",
};

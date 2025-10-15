import { getProjects } from "@/lib/content";
import Link from "next/link";

export default function HomePage() {
  const projects = getProjects();
  return (
    <section className="px-6 pb-16">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map(p => (
          <Link key={p.slug} href={`/projects/${p.slug}`} className="block group">
            <div className="aspect-[4/3] overflow-hidden bg-neutral-100">
              <img src={p.cover} alt={p.title} className="w-full h-full object-cover transition-transform group-hover:scale-[1.02]" />
            </div>
            <div className="mt-2 text-xs tracking-wide">
              {p.status ? `${p.status} - ` : ""}{p.title.toUpperCase()}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

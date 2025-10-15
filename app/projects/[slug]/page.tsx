import path from "path";
import fs from "fs";
import matter from "gray-matter";
import { marked } from "marked";

export async function generateStaticParams() {
  const dir = path.join(process.cwd(), "content", "projects");
  return fs.readdirSync(dir).filter(f=>f.endsWith(".md")).map(f => ({
    slug: f.replace(/\.md$/, "")
  }));
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const fp = path.join(process.cwd(), "content", "projects", `${params.slug}.md`);
  const { data, content } = matter(fs.readFileSync(fp, "utf8"));
  const gallery = (data.gallery || []) as any[];
  return (
    <article className="px-6 max-w-5xl mx-auto pb-16">
      <div className="mb-6">
        <div className="text-xs opacity-70">{data.status ? `${data.status} • ` : ""}{data.location}</div>
        <h1 className="text-2xl mt-1">{data.title}</h1>
      </div>
      <img src={data.cover} alt={data.title} className="w-full mb-6 rounded-lg" />
      <div className="prose mb-8" dangerouslySetInnerHTML={{ __html: marked(content) }} />
      {gallery?.length ? (
        <div className="grid gap-4 md:grid-cols-2">
          {gallery.map((g: any, i: number) => {
            const src = typeof g === "string" ? g : g.image;
            return <img key={i} src={src} className="w-full rounded-lg" alt="" />;
          })}
        </div>
      ) : null}
    </article>
  );
}

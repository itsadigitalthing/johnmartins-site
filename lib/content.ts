import fs from "fs";
import path from "path";
import matter from "gray-matter";

const root = process.cwd();

export type Project = {
  title: string;
  location: string;
  status?: string;
  cover: string;
  gallery?: { image: string }[] | string[];
  date: string;
  slug: string;
  body?: string;
};

function readMarkdown(filePath: string) {
  const file = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(file);
  return { data, content };
}

export function getProjects(): Project[] {
  const dir = path.join(root, "content", "projects");
  const files = fs.readdirSync(dir).filter(f => f.endsWith(".md"));
  return files
    .map(f => {
      const { data, content } = readMarkdown(path.join(dir, f));
      return { ...(data as any), body: content } as Project;
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPage(bodyFile: string) {
  const fp = path.join(root, "content", "pages", bodyFile);
  const { content } = readMarkdown(fp);
  return content;
}

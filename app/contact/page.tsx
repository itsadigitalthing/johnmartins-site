import { getPage } from "@/lib/content";
import { marked } from "marked";

export default function ContactPage() {
  const md = getPage("contact.md");
  return <section className="prose px-6 max-w-3xl py-8" dangerouslySetInnerHTML={{ __html: marked(md) }} />;
}

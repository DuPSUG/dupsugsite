import ReloadOnce from "./ReloadOnce";
import { TerminalHeader } from "@/components/terminal-header";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";

export default async function AboutPage() {
  const filePath = path.join(process.cwd(), "data", "about.md");
  const fileContent = fs.readFileSync(filePath, "utf8");
  const { data, content: md } = matter(fileContent);
  const html = marked.parse(md);

  return (
    <div className="min-h-screen bg-background">
      <ReloadOnce />
      <TerminalHeader />
      <main className="container mx-auto px-4 py-8">
        <div className="terminal-prompt mb-8">
          <span className="text-accent">Get-Content</span> -Path ./about.md
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="mb-6 p-4 border border-border rounded">
            <h1 className="text-3xl font-bold mb-2">{data.title ?? "About"}</h1>
            <div className="text-muted-foreground">
              <span>By {data.author ?? "Unknown"}</span>
              <span className="mx-2">•</span>
              <span>{(data.date ?? new Date().toISOString()).split("T")[0]}</span>
            </div>
          </div>

          <div className="prose prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: html }} />
        </div>
      </main>
    </div>
  );
}

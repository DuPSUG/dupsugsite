// app/page.tsx  (no "use client")
import { TerminalHeader } from "@/components/terminal-header";
import { getBlogPosts } from "@/lib/posts.server";
import BlogListClient from "@/components/blog-list-client";


export default async function Page() {
  const posts = await getBlogPosts();
  return (
    <div className="min-h-screen bg-background">
      <TerminalHeader />
      <main className="container mx-auto px-4 py-8">
        <div className="terminal-prompt mb-8">
          <span className="text-accent">Get-BlogPost</span> -Filter * -SortBy Date -Descending
        </div>
        <div className="prose prose-invert max-w-none prose-tight">
          <BlogListClient initialPosts={posts} />
        </div>
      </main>
    </div>
  );
}

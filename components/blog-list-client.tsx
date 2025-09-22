"use client";
import { useState, useEffect } from "react";
import type { Post } from "@/lib/posts.server";
import { BlogPost as BlogPostCard } from "@/components/blog-post";

export default function BlogListClient({ initialPosts }: { initialPosts: Post[] }) {
  const [posts, setPosts] = useState(initialPosts);
  const [loading, setLoading] = useState(false);

  const loadMorePosts = () => {
    if (loading) return;
    setLoading(true);
    setTimeout(() => {
      // Stop infinite scrolling since there are only 2 real posts
      // In a real implementation, this would fetch more posts from the server
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    const onScroll = () => {
      if (loading) return;
      if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return;
      loadMorePosts();
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [loading, posts.length]);

  return (
    <>
      <div className="space-y-6">
        {posts.map(p => <BlogPostCard key={p.slug} post={p} />)}
      </div>
      {posts.length > 0 && (
        <div className="mt-12 pt-8 border-t border-border">
          <div className="terminal-prompt">
            <span className="text-muted-foreground">End of current session. All posts loaded.</span>
          </div>
        </div>
      )}
    </>
  );
}

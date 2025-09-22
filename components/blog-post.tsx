import { Card } from "@/components/ui/card"

interface BlogPost {
  id?: string
  slug: string
  title: string
  date: string
  author?: string
  content?: string
}

interface BlogPostProps {
  post: BlogPost
}

export function BlogPost({ post }: BlogPostProps) {
  return (
    <Card className="mb-6 p-6 bg-card border-border">
      <div className="terminal-prompt mb-4">
        <span className="text-accent bg-muted px-2 py-1 rounded font-bold">Get-BlogPost</span>
        <span className="text-card-foreground"> -Title "{post.title}"</span>
      </div>

      <div className="terminal-output space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <span className="text-muted-foreground font-semibold">Title:</span>
            <div className="text-card-foreground font-semibold mt-1">{post.title}</div>
          </div>
          <div>
            <span className="text-muted-foreground font-semibold">Date:</span>
            <div className="text-card-foreground mt-1">{post.date}</div>
          </div>
          <div>
            <span className="text-muted-foreground font-semibold">Author:</span>
            <div className="text-card-foreground mt-1">{post.author}</div>
          </div>
        </div>

        <div className="border-t border-border pt-4">
          <div
            className="prose prose-invert max-w-none text-card-foreground [&>*]:text-card-foreground"
            dangerouslySetInnerHTML={{ __html: post.content || "" }}
          />
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-border">
        <div className="terminal-prompt">
          <span className="text-muted-foreground">Command completed successfully.</span>
        </div>
      </div>
    </Card>
  )
}

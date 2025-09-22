import { TerminalHeader } from "@/components/terminal-header"
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { marked } from 'marked'

export default async function CodeOfConductPage() {
  let content = ""
  let metadata = { title: 'Code of Conduct', date: new Date().toISOString().split('T')[0], author: 'Unknown' }

  try {
    const filePath = path.join(process.cwd(), 'data', 'code-of-conduct.md')
    const fileContent = fs.readFileSync(filePath, 'utf8')

    const { data, content: markdownContent } = matter(fileContent)

    // Configure marked to handle line breaks correctly
    marked.setOptions({
      breaks: false, // Don't convert single line breaks to <br> tags
      gfm: true, // Enable GitHub Flavored Markdown
    });

    content = await marked(markdownContent)
    metadata = {
      title: data.title || 'Code of Conduct',
      date: data.date || new Date().toISOString().split('T')[0],
      author: data.author || 'Unknown'
    }
  } catch (error) {
    console.error('Error loading code of conduct content:', error)
  }

  return (
    <div className="min-h-screen bg-background">
      <TerminalHeader />

      <main className="container mx-auto px-4 py-8">
        <div className="terminal-prompt mb-8">
          <span className="text-accent">Get-Content</span> -Path ./code-of-conduct.md
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="mb-6 p-4 border border-border rounded">
            <h1 className="text-3xl font-bold mb-2">{metadata.title}</h1>
            <div className="text-muted-foreground">
              <span>By {metadata.author}</span>
              <span className="mx-2">•</span>
              <span>{new Date(metadata.date).toLocaleDateString()}</span>
            </div>
          </div>

          <div
            className="prose prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
      </main>
    </div>
  )
}
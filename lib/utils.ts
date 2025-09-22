import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export interface BlogPost {
  id: string
  title: string
  date: string
  author: string
  content: string
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  const blogDirectory = path.join(process.cwd(), 'data', 'blog')

  try {
    // Check if directory exists
    if (!fs.existsSync(blogDirectory)) {
      console.warn('Blog directory not found:', blogDirectory)
      return []
    }

    // Read all markdown files
    const files = fs.readdirSync(blogDirectory)
      .filter(file => file.endsWith('.md'))
      .sort((a, b) => {
        // Sort by date (newest first)
        const fileA = fs.readFileSync(path.join(blogDirectory, a), 'utf8')
        const fileB = fs.readFileSync(path.join(blogDirectory, b), 'utf8')
        const matterA = matter(fileA)
        const matterB = matter(fileB)

        const dateA = new Date(matterA.data.date || '1970-01-01')
        const dateB = new Date(matterB.data.date || '1970-01-01')

        return dateB.getTime() - dateA.getTime()
      })

    const posts: BlogPost[] = []

    for (const file of files) {
      const filePath = path.join(blogDirectory, file)
      const fileContent = fs.readFileSync(filePath, 'utf8')

      const { data, content } = matter(fileContent)

      // Process markdown to HTML
      const processedContent = await remark()
        .use(remarkHtml)
        .process(content)

      const htmlContent = processedContent.toString()

      posts.push({
        id: path.basename(file, '.md'),
        title: data.title || 'Untitled',
        date: data.date || new Date().toISOString().split('T')[0],
        author: data.author || 'Unknown',
        content: htmlContent
      })
    }

    return posts
  } catch (error) {
    console.error('Error reading blog posts:', error)
    return []
  }
}

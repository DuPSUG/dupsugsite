"use client"

import { useEffect } from "react"

interface MarkdownRendererProps {
  content: string // This is already HTML from marked
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  useEffect(() => {
    const loadPrism = async () => {
      // Load Prism CSS
      if (!document.querySelector('link[href*="prism"]')) {
        const link = document.createElement("link")
        link.rel = "stylesheet"
        link.href = "https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-tomorrow.min.css"
        document.head.appendChild(link)
      }

      // Load Prism JS
      if (!window.Prism) {
        const script = document.createElement("script")
        script.src = "https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-core.min.js"
        document.head.appendChild(script)

        await new Promise((resolve) => {
          script.onload = resolve
        })

        const powershellScript = document.createElement("script")
        powershellScript.src = "https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-powershell.min.js"
        document.head.appendChild(powershellScript)

        // Load other common language components
        const languages = ["markup", "css", "javascript", "typescript", "jsx", "tsx", "bash", "json"]
        for (const lang of languages) {
          const langScript = document.createElement("script")
          langScript.src = `https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-${lang}.min.js`
          document.head.appendChild(langScript)
        }
      }

      // Highlight code after Prism loads
      setTimeout(() => {
        if (window.Prism && window.Prism.highlightAll) {
          try {
            window.Prism.highlightAll()
          } catch (error) {
            console.error("Prism highlighting failed:", error)
          }
        }
      }, 300)
    }

    loadPrism()
  }, [content])

  return <div className="prose prose-invert prose-tight max-w-none markdown-content" dangerouslySetInnerHTML={{ __html: content }} />
}

declare global {
  interface Window {
    Prism: any
  }
}
# Dutch PowerShell User Group Website

This repository contains the source code for the **Dutch PowerShell User Group (DuPSUG)** website.  
The site provides information about upcoming events, blog posts, and resources for the PowerShell and automation community in the Netherlands.

---

## 🚀 Tech Stack

**Frontend Framework & Runtime**
- [Next.js 14](https://nextjs.org/) – React framework with App Router for static export and file-based routing
- [React 18](https://react.dev/) – UI library with concurrent features and hooks
- [TypeScript](https://www.typescriptlang.org/) – Type-safe JavaScript for a better developer experience

**Styling & UI**
- [Tailwind CSS](https://tailwindcss.com/) – Utility-first CSS framework

**Hosting**
- [GitHub Pages](https://pages.github.com/) – Static site hosting

---

## 📝 Adding Blog Posts
Blog posts are written in Markdown and live in the `data/blog/` directory.
Each post must include a frontmatter header:

```markdown
---
title: "DuPSUG – Autumn 2025 🍂"
date: "2025-09-23"
author: "Admin"
---
```

title → Title of the blog post

date → Publication date in YYYY-MM-DD format

author → Post author (defaults to Admin if omitted)

To add a new blog post, copy an existing file in [data/blog/](https://github.com/DuPSUG/dupsugsite/tree/main/data/blog) and adjust the header and content.

## 🔄 Deployment
Deployment is handled automatically with GitHub Actions.

* Push changes to main
* GitHub Actions will build and export the site to docs/
* GitHub Pages serves the site from the docs/ folder on the main branch

The deployed site is available at:
👉 https://dupsug.github.io/dupsugsite

```
 ┌────────────┐       ┌────────────────┐       ┌───────────────────┐
 │   Commit   │  -->  │ GitHub Actions │  -->  │ GitHub Pages (docs│
 │   to main  │       │  build & export│       │   branch folder)  │
 └────────────┘       └────────────────┘       └───────────────────┘
```

## 🐞 Troubleshooting
404s or missing CSS
Make sure basePath and assetPrefix in next.config.mjs match the repository name (/dupsugsite).

GitHub Actions build errors
Check workflow logs under .github/workflows/nextjs.yml.

Blog post not rendering
Verify frontmatter header matches the required format.

## 🤝 Contributing
Contributions from the PowerShell community are welcome!
If you’d like to add content or improve the site:

* Fork the repo
* Create a feature branch
* Open a pull request

## 🛠 Local Development

Clone the repository and install dependencies:

```bash
git clone https://github.com/DuPSUG/dupsugsite.git
cd dupsugsite
npm install
```

Start the development server:

```bash
Copy code
npm run dev
```
The site will be available at http://localhost:3000.

## 📦 Build & Export
This project uses Next.js static export.

```bash
Copy code
npm run build
```

By default, static files are output to the docs/ directory for deployment to GitHub Pages.

## 📄 License
This project is licensed under the MIT License.

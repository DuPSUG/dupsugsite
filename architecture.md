## Technology Overview & Architecture Analysis

### Core Technology Stack

**Frontend Framework & Runtime:**
- **Next.js 14** - React framework with App Router for server-side rendering and file-based routing
- **React 18** - UI library with concurrent features and hooks
- **TypeScript** - Type-safe JavaScript for better development experience

**Styling & UI:**
- **Tailwind CSS** - Utility-first CSS framework for rapid UI development
- **Radix UI** - Headless component library providing 20+ accessible components
- **Geist Font** - Modern typography system (Sans & Mono variants)
- **Tailwind Typography** - Plugin for beautiful markdown rendering

**State Management:**
- **React Context** - Custom providers for text size and theme management
- **next-themes** - Theme switching functionality (light/dark mode)
- **localStorage** - Persistent storage for user preferences

**Data Processing:**
- **Gray Matter** - Frontmatter parsing for markdown files
- **Marked** - Markdown to HTML conversion with custom renderer
- **Remark** - Additional markdown processing utilities

**Development & Build Tools:**
- **PostCSS & Autoprefixer** - CSS processing and vendor prefixing
- **ESLint** - Code linting and quality assurance
- **GitHub Actions** - CI/CD pipeline for automated deployment

### Architecture Diagram

```mermaid
graph TB
    %% Data Sources
    DS[Data Sources]
    MD[Markdown Files<br/>/data/blog/*.md]
    FS[File System<br/>Node.js fs/promises]
    LS[localStorage<br/>User Preferences]
    
    %% Server Components
    SC[Server Components]
    Layout[app/layout.tsx<br/>Root Layout Provider]
    Page[app/page.tsx<br/>Home Page]
    PostsLib[lib/posts.server.ts<br/>Data Processing]
    
    %% Client Components
    CC[Client Components]
    Header[TerminalHeader<br/>Navigation & Branding]
    BlogList[BlogListClient<br/>Post List & Pagination]
    BlogPost[BlogPost<br/>Individual Post Display]
    MarkdownRenderer[MarkdownRenderer<br/>Content Processing]
    TextSizeProvider[TextSizeProvider<br/>Font Size Context]
    TextSizeManager[TextSizeManager<br/>Size Controls]
    ThemeProvider[ThemeProvider<br/>Theme Context]
    
    %% UI Components
    UI[UI Components<br/>Radix UI]
    Cards[Card Components]
    Buttons[Button Components]
    Forms[Form Components]
    
    %% External Services
    ES[External Services]
    Vercel[Vercel Analytics<br/>Usage Tracking]
    Fonts[Geist Fonts<br/>Typography]
    
    %% Dependencies Flow
    DS -->|Raw Content| PostsLib
    FS -->|File Operations| PostsLib
    PostsLib -->|Processed Posts| Page
    LS -->|User Settings| TextSizeProvider
    LS -->|Theme Settings| ThemeProvider
    
    %% Server to Client Flow
    Page -->|Server Rendered| Layout
    Layout -->|Providers| TextSizeProvider
    Layout -->|Providers| ThemeProvider
    TextSizeProvider -->|Context| TextSizeManager
    ThemeProvider -->|Context| Header
    
    %% Component Hierarchy
    Page -->|Initial Data| BlogList
    BlogList -->|Post Data| BlogPost
    BlogPost -->|Content| MarkdownRenderer
    MarkdownRenderer -->|HTML| UI
    
    %% Styling Flow
    Tailwind[Tailwind CSS<br/>Utility Classes] -->|Styles| Header
    Tailwind -->|Styles| BlogList
    Tailwind -->|Styles| BlogPost
    Tailwind -->|Styles| UI
    
    %% External Integrations
    Vercel -->|Analytics| Page
    Fonts -->|Typography| Layout
    
    %% Build Process
    NextJS[Next.js Build<br/>SSR + Static Gen] -->|Optimized| Page
    GitHubActions[GitHub Actions<br/>CI/CD] -->|Deploy| Vercel
    
    %% Subgraph for Data Processing
    subgraph "Data Processing Pipeline"
        MD -->|Read| PostsLib
        PostsLib -->|Parse Frontmatter| GrayMatter[Gray Matter]
        PostsLib -->|Convert MD to HTML| Marked[Marked Renderer]
        GrayMatter -->|Metadata| PostsLib
        Marked -->|HTML Content| PostsLib
    end
    
    %% Subgraph for State Management
    subgraph "State Management"
        TextSizeProvider -->|Context API| TextSizeManager
        ThemeProvider -->|Context API| Header
        TextSizeManager -->|UI Controls| UI
    end
    
    %% Subgraph for UI Layer
    subgraph "UI Component Layer"
        UI -->|Primitives| Cards
        UI -->|Primitives| Buttons
        UI -->|Primitives| Forms
        Cards -->|Composition| BlogPost
        Buttons -->|Composition| Header
    end
```

### Key Dependencies & Data Flow

**Data Sources → Processing Pipeline:**
1. **Markdown Files** (`/data/blog/*.md`) contain blog posts with frontmatter metadata
2. **File System** operations read these files using Node.js `fs/promises`
3. **Gray Matter** parses frontmatter (title, date, author, tags, excerpt)
4. **Marked** converts markdown content to HTML with custom renderer
5. **Posts Library** (`lib/posts.server.ts`) orchestrates the entire data processing pipeline

**Server-Side Rendering Flow:**
1. **Page Component** (`app/page.tsx`) fetches posts using `getBlogPosts()`
2. **Server Components** render initial HTML with post data
3. **Client Components** hydrate for interactivity (blog list, theme switching)

**State Management Architecture:**
1. **TextSizeProvider** manages font size preferences via React Context
2. **ThemeProvider** handles light/dark theme switching
3. **localStorage** persists user preferences across sessions
4. **Context Consumers** throughout the app access and update these states

**UI Component Architecture:**
1. **Radix UI** provides headless, accessible component primitives
2. **Custom Components** compose these primitives with Tailwind styling
3. **Terminal-themed Design** creates a unique developer-focused aesthetic

**Build & Deployment:**
1. **Next.js** handles SSR, static generation, and optimization
2. **GitHub Actions** automates build and deployment to Vercel
3. **Vercel Analytics** provides usage statistics
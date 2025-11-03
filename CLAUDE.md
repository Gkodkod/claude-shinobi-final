# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server with Turbopack for faster builds
- `npm run build` - Build production application
- `npm run start` - Start production server
- `npm run lint` - Run Next.js linting
- `npm run test` - Run Vitest tests
- `npm run test:ui` - Run tests with UI interface

## Architecture Overview

**Shinobi** is a Next.js 15 blog application built as a Claude Code learning project. The architecture follows modern React patterns with App Router.

### Key Technologies

- **Next.js 15** with App Router and Turbopack
- **React 19** with TypeScript
- **Tailwind CSS v4** with custom CSS variables for theming
- **Vitest** for testing with JSDOM environment
- **DOMPurify** for HTML sanitization
- **GraphQL** for content management via Hygraph CMS

### Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout with header and dark mode toggle
│   ├── page.tsx           # Homepage with navigation to blog/preview
│   ├── blog/              # Blog listing and individual posts
│   └── preview/           # Component preview page
├── components/            # Reusable React components
│   ├── ui/                # UI component library
│   │   ├── Avatar/        # Avatar component with initials display
│   │   ├── Button/        # Button component with variants and sizes
│   │   ├── Calendar/      # Calendar component with date/range selection
│   │   ├── Card/          # Card container component with variants
│   │   ├── Icon/          # Icon wrapper component with styling
│   │   └── Modal/         # Modal dialog component
│   ├── BlogSidebar.tsx    # Blog page sidebar
│   └── DarkModeToggle.tsx # Theme switching component
├── hooks/                 # Reusable hooks
└── lib/                   # Utility functions and types
    ├── queries.ts         # GraphQL queries for blog data
    ├── types.ts           # TypeScript type definitions
    ├── sanitize.ts        # HTML sanitization utilities
    └── mockData.ts        # 120 mock blog posts for development
```

### Data Architecture

- **External CMS**: Uses Hygraph (GraphQL CMS) for blog content (optional)
- **Mock Data Fallback**: App includes sample blog posts when Hygraph is not configured
- **Environment Variables**: Optional `HYGRAPH_ENDPOINT` for GraphQL API
- **Data Fetching**: Server-side rendering with 1-hour revalidation
- **Content Security**: HTML content is sanitized using DOMPurify with strict allowlists

#### Blog Content Setup

The blog works in two modes:

1. **Development Mode (Default)**: Uses mock blog posts from `src/lib/mockData.ts`
   - No setup required - just run the app
   - Includes 120 sample blog posts about AI tools, Vite, MCP, and modern web development
   - Perfect for UI development and testing

2. **Production Mode (Optional)**: Fetches real content from Hygraph CMS
   - Create a free account at [hygraph.com](https://hygraph.com)
   - Set up a blog content model with these fields:
     - `blogTitle` (String)
     - `blogPostSlug` (String, unique)
     - `blogPostContent` (Rich Text)
     - `createdBy` (Reference to User)
     - `createdAt` (DateTime)
   - Add your Hygraph endpoint to `.env.local`:
     ```
     HYGRAPH_ENDPOINT=https://your-region.hygraph.com/v2/your-project-id/master
     ```

#### Blog Features

- **Dynamic Categories**: Keyword-based categorization system automatically categorizes posts
  - Categories include: Vite, ChatGPT & OpenAI, Claude & Anthropic, GitHub Copilot, Google Gemini, Grok, AI Editors, AI Agents, MCP, RAG & Embeddings, Prompt Engineering, General
  - Category filtering via URL query parameters (`/blog?category=...`)
  - Server-side filtering for optimal performance
- **Scrollable Sidebar**: Sticky sidebar with overflow scrolling to display all categories
- **Next.js 15 Compatibility**: Uses async params and searchParams pattern
- **Category Highlighting**: Active category is highlighted in sidebar based on URL state

### Styling System

- **Custom Theme System**: CSS variables in `globals.css` with light/dark mode support
- **Tailwind Integration**: Custom color tokens mapped to CSS variables
- **Component Styling**: Mix of Tailwind classes and inline styles
- **Typography**: Uses Rubik (headings) and Merriweather (body) from Google Fonts

### Testing Setup

- **Vitest** configured with React Testing Library
- **JSDOM environment** for DOM testing
- **Setup file**: `src/test/setup.ts` for test configuration
- **Type definitions**: Custom vitest types in `src/test/vitest.d.ts`

## Development Notes

- Uses `@/*` path alias for src imports
- Blog works with mock data by default (Hygraph CMS is optional)
- Dark mode state is managed via CSS classes on root element
- Component testing follows React Testing Library patterns
- HTML sanitization is critical for security when displaying CMS content
- Next.js 15 requires awaiting `params` and `searchParams` before accessing properties
- Category filtering is implemented server-side for better performance
- BlogSidebar and blog page share the same `categorizePost` function logic

- when making new page components, always add a link to that page in the header. Only do this for page components, not UI or other drop-in components.

- Use Context7 to check up-to-date docs when needed for implementing new libraries or frameworks, or adding features using them.
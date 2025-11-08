export default function About() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-accent/5 to-primary/10 border-b border-border">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6 text-secondary">
              About Shinobi
            </h1>
            <p className="text-lg text-muted/80 max-w-2xl mx-auto">
              A modern blog and design system showcase built with Next.js 15, React 19, and Tailwind CSS v4.
            </p>
          </div>
        </div>
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-primary/10 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-accent/10 to-transparent rounded-full translate-y-1/2 -translate-x-1/2"></div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Blog Section */}
        <section className="mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-6">The Blog</h2>
          <div className="space-y-4 text-foreground/80 leading-relaxed">
            <p>
              The Shinobi blog is a content-rich platform designed for web developers and tech enthusiasts.
              It features a clean, modern interface that emphasizes readability and user experience.
            </p>
            <p>
              Blog posts are powered by <strong>Hygraph</strong>, a headless GraphQL CMS that provides
              flexible content management. Each post includes rich HTML content that is carefully sanitized
              using DOMPurify to ensure security while maintaining formatting and styles.
            </p>
            <p>
              Key features of the blog include:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Server-side rendering with 1-hour revalidation for optimal performance</li>
              <li>Author attribution with custom avatar components displaying initials</li>
              <li>Responsive sidebar with additional content and navigation</li>
              <li>Beautiful gradient hero sections with decorative elements</li>
              <li>Full dark mode support that adapts to user preferences</li>
              <li>Individual post pages with full content display and metadata</li>
            </ul>
            <p>
              The blog layout uses a sophisticated grid system with a two-thirds main content area
              and one-third sidebar, ensuring content is the focus while providing easy access to
              navigation and supplementary information.
            </p>
          </div>
        </section>

        {/* Preview Section */}
        <section className="mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-6">The Preview Page</h2>
          <div className="space-y-4 text-foreground/80 leading-relaxed">
            <p>
              The Preview page serves as a comprehensive showcase of the Shinobi design system,
              demonstrating all available UI components in action. It's an essential resource
              for developers working with the codebase, providing live examples of every component
              with their various configurations.
            </p>
            <p>
              The design system features a carefully crafted theme built on CSS custom properties,
              enabling seamless light and dark mode switching. Typography uses a elegant pairing of
              <strong> Rubik</strong> for headings and <strong>Merriweather</strong> for body text,
              creating a balanced, professional aesthetic.
            </p>
            <p>
              Components available in the design system:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>
                <strong>Button</strong> - Five variants (primary, secondary, success, warning, danger)
                with hover effects, focus states, and disabled modes
              </li>
              <li>
                <strong>Avatar</strong> - Displays user initials with four size options (sm, md, lg, xl)
                and multiple color variants including gradient effects
              </li>
              <li>
                <strong>Card</strong> - Flexible container component with five variants, three sizes,
                and optional interactive states for clickable cards
              </li>
              <li>
                <strong>Icon</strong> - Circular icon wrapper supporting Lucide icons with customizable
                variants and sizes, perfect for status indicators and action buttons
              </li>
              <li>
                <strong>Modal</strong> - Clean, accessible modal dialogs with semi-transparent backdrop,
                keyboard navigation (ESC to close), and click-outside-to-close functionality
              </li>
            </ul>
            <p>
              Each component is built with accessibility in mind, featuring proper ARIA attributes,
              keyboard navigation support, and semantic HTML. The Preview page includes practical
              examples showing real-world usage patterns, from comment threads to action bars,
              helping developers understand not just what the components are, but how to use them effectively.
            </p>
            <p>
              The entire design system is built with <strong>Tailwind CSS v4</strong>, leveraging
              custom color tokens mapped to CSS variables for consistent theming across the application.
              All components are fully responsive and work seamlessly across devices.
            </p>
          </div>
        </section>

        {/* Technology Stack */}
        <section>
          <h2 className="text-4xl font-bold text-foreground mb-6">Built With Modern Tech</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-surface rounded-lg border border-border">
              <h3 className="text-xl font-semibold text-primary mb-3">Frontend</h3>
              <ul className="space-y-2 text-foreground/80">
                <li>• Next.js 15 with App Router</li>
                <li>• React 19 with TypeScript</li>
                <li>• Tailwind CSS v4</li>
                <li>• Turbopack for faster builds</li>
              </ul>
            </div>
            <div className="p-6 bg-surface rounded-lg border border-border">
              <h3 className="text-xl font-semibold text-success mb-3">Content & Testing</h3>
              <ul className="space-y-2 text-foreground/80">
                <li>• Hygraph GraphQL CMS</li>
                <li>• DOMPurify for sanitization</li>
                <li>• Vitest with React Testing Library</li>
                <li>• Lucide React for icons</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

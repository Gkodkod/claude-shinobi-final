import Avatar from '@/components/ui/Avatar/Avatar'
import { BlogPost } from '@/lib/types'
import Link from 'next/link'

// Function to categorize posts based on title keywords
function categorizePost(title: string): string {
  const titleLower = title.toLowerCase()

  if (titleLower.includes('vite')) return 'Vite'
  if (titleLower.includes('chatgpt') || titleLower.includes('gpt-4') || titleLower.includes('openai')) return 'ChatGPT & OpenAI'
  if (titleLower.includes('claude') || titleLower.includes('anthropic')) return 'Claude & Anthropic'
  if (titleLower.includes('copilot') || titleLower.includes('github')) return 'GitHub Copilot'
  if (titleLower.includes('gemini') || titleLower.includes('google')) return 'Google Gemini'
  if (titleLower.includes('grok') || titleLower.includes('x.ai')) return 'Grok'
  if (titleLower.includes('cursor') || titleLower.includes('continue') || titleLower.includes('codeium')) return 'AI Editors'
  if (titleLower.includes('agent') || titleLower.includes('autogpt') || titleLower.includes('langchain') || titleLower.includes('crewai')) return 'AI Agents'
  if (titleLower.includes('mcp') || titleLower.includes('model context protocol')) return 'MCP'
  if (titleLower.includes('rag') || titleLower.includes('vector') || titleLower.includes('embedding') || titleLower.includes('semantic search')) return 'RAG & Embeddings'
  if (titleLower.includes('prompt')) return 'Prompt Engineering'

  return 'General'
}

export default function BlogSidebar({ posts, selectedCategory }: { posts: BlogPost[], selectedCategory?: string | null }) {
  // Calculate category counts
  const categoryCounts = posts.reduce((acc, post) => {
    const category = categorizePost(post.blogTitle)
    acc[category] = (acc[category] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  // Sort categories by count (descending) - show all categories
  const allCategories = Object.entries(categoryCounts)
    .sort(([, a], [, b]) => b - a)
  return (
    <div className="sticky top-8 space-y-8 max-h-[calc(100vh-4rem)] overflow-y-auto pr-2">
      {/* About Section */}
      <div className="pb-8 border-b border-border">
        <h3 className="text-xl font-bold mb-4 text-foreground">About This Blog</h3>
        <p className="text-muted text-sm leading-relaxed mb-4">
          Welcome to our blog where we share insights, tutorials, and thoughts on modern web development, design, and technology trends.
        </p>
        <p className="text-muted/80 text-sm">
          Stay tuned for regular updates and deep dives into the latest in tech.
        </p>
      </div>

      {/* Categories */}
      <div className="pb-8 border-b border-border">
        <h3 className="text-xl font-bold mb-4 text-foreground">Categories</h3>
        <div className="space-y-2">
          {/* All Posts Link */}
          <Link href="/blog" className="flex items-center justify-between group">
            <span className={`text-sm transition-colors ${!selectedCategory ? 'text-primary font-semibold' : 'text-muted hover:text-primary'}`}>
              All Posts
            </span>
            <span className="text-xs text-muted/60 bg-primary/10 px-2 py-1 rounded-full">
              {posts.length}
            </span>
          </Link>

          {/* Category Links */}
          {allCategories.map(([category, count]) => (
            <Link
              key={category}
              href={`/blog?category=${encodeURIComponent(category)}`}
              className="flex items-center justify-between group"
            >
              <span className={`text-sm transition-colors ${selectedCategory === category ? 'text-primary font-semibold' : 'text-muted group-hover:text-primary'}`}>
                {category}
              </span>
              <span className="text-xs text-muted/60 bg-primary/10 px-2 py-1 rounded-full">
                {count}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="pb-8 border-b border-border">
        <h3 className="text-xl font-bold mb-4 text-foreground">Recent Activity</h3>
        <div className="space-y-4">
          {[
            { action: 'New post published', time: '2 hours ago', user: 'Alice Johnson' },
            { action: 'Comment on "React Tips"', time: '1 day ago', user: 'Bob Smith' },
            { action: 'Post updated', time: '3 days ago', user: 'Carol Davis' },
            { action: 'New subscriber', time: '1 week ago', user: 'David Wilson' }
          ].map((item, index) => (
            <div key={index} className="flex items-start space-x-3">
              <Avatar name={item.user} size="sm" variant="primary" />
              <div>
                <p className="text-sm text-muted">{item.action}</p>
                <p className="text-xs text-muted/60">{item.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Newsletter */}
      <div>
        <h3 className="text-xl font-bold mb-4 text-foreground">Stay Updated</h3>
        <p className="text-muted text-sm mb-4">
          Subscribe to our newsletter for the latest posts and updates.
        </p>
        <div className="space-y-3">
          <input 
            type="email" 
            placeholder="Enter your email"
            className="w-full px-3 py-2 bg-surface border border-border rounded-lg text-foreground text-sm focus:outline-none focus:border-primary transition-colors"
          />
          <button className="w-full bg-primary text-white py-2 rounded-lg text-sm font-medium hover:bg-accent transition-colors">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  )
}
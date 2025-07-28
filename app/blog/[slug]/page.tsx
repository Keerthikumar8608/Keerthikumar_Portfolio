"use client"

import { useParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, ArrowLeft, User } from "lucide-react"
import { ProtectedImage } from "@/components/protected-image"
import { ImageCarousel } from "@/components/image-carousel"
import NavigationBar from "@/components/navigation-bar"

// Blog data - in a real app, this would come from a CMS or database
const blogPosts = [
  {
    id: "the-dream",
    title: "The Dream",
    excerpt:
      "How my passion for automobiles turned into a career path - from early fascination with cars to pursuing mechanical engineering across diverse industries.",
    images: [
      "/b1.jpg",
    ],
    date: "July 25, 2025",
    tags: ["Automotive", "Engineering", "Career"],
    readTime: "2 min read",
    content: `# The Dream
How My Passion for Automobiles Turned Into a Career Path

## A Spark from Unexpected Inspiration

My fascination with automobiles began early in life—drawn to the design, power, and engineering behind cars and bikes. What truly deepened this passion was an early exposure to automotive simulation games, which introduced me to car performance, mechanical components, and the variety across global car brands.

## Curiosity Turned Into Passion

One car that captured my attention was the Ford Mustang GT, a symbol of American muscle and heritage. Researching it led me to Carroll Shelby, the legendary racer and designer. From there, I immersed myself in the technical and historical sides of automotive engineering.

## The Engineering Dream

I've always been inspired by famous car designers and the advanced technology involved in building high-performance machines. Motorsports like Hypercars, Rally, Dakar, and Le Mans push the limits of design and demand extreme levels of engineering. But my curiosity didn't stop there.

I was also fascinated by the engineering behind aeronautics, marine vessels like ships and yachts, and large-scale industrial plants. The complexity of these systems—ranging from thermal systems to structural design—showed me how broad and impactful mechanical engineering truly is. This inspired me to pursue Mechanical Engineering, a field that connects innovation with real-world performance across industries.

## Learning Through Real-World Connections

For me, engineering is not limited to books or classrooms. I constantly relate core concepts to real-world applications, which helps me understand deeper and think critically. Whether it's thermodynamics or design mechanics, I always explore how they apply to machines and systems I admire.

## Subjects That Fuel Me

Design & Graphics | Thermal Engineering | Strength of Materials | Material Science | Manufacturing Technology

## The Road Ahead

What began as curiosity has grown into a focused career path. My goal is not just to understand machines, but to innovate and design them. The dream that once started with admiration is now backed by engineering skill and purpose.

---

*"It's not just about what you write on paper—it's about how deeply you understand what's behind it."*`,
    author: "Keerthi Kumar M",
    authorImage: "/profile.jpg"
  }
]

export default function BlogPage() {
  const params = useParams()
  const slug = params?.slug as string

  // Find the blog post based on the slug
  const post = blogPosts.find(p => p.id === slug)

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Blog post not found</h1>
          <Link href="/#blogs">
            <Button variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blogs
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <NavigationBar />
      
      {/* Header */}
      <header className="bg-background border-b border-border">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <Link href="/#blogs">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Portfolio
            </Button>
          </Link>
        </div>
      </header>

      {/* Blog Content */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        {/* Blog Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
            {post.title}
          </h1>
          
          {/* Blog Meta */}
          <div className="flex flex-wrap items-center gap-6 text-muted-foreground mb-8">
            <div className="flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              {post.date}
            </div>
            <span className="text-sm">{post.readTime}</span>
            <div className="flex items-center">
              <User className="w-5 h-5 mr-2" />
              {post.author}
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {post.tags.map((tag, index) => (
              <Badge key={index} variant="secondary" className="text-sm">
                {tag}
              </Badge>
            ))}
          </div>

          {/* Featured Image */}
          <div className="mb-8">
            <ImageCarousel
              images={post.images}
              width={800}
              height={400}
              altPrefix={post.title}
              className="w-full h-64 md:h-96 rounded-lg overflow-hidden"
            />
          </div>
        </div>

        {/* Blog Content */}
        <article className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-foreground prose-strong:text-foreground prose-li:text-foreground">
          {post.content.split('\n').map((paragraph, index) => {
            const trimmed = paragraph.trim()
            
            if (paragraph.startsWith('# ')) {
              return (
                <h1 key={index} className="text-3xl md:text-4xl font-bold mt-8 mb-6 text-foreground">
                  {paragraph.slice(2)}
                </h1>
              )
            } else if (paragraph.startsWith('## ')) {
              return (
                <h2 key={index} className="text-2xl md:text-3xl font-bold mt-12 mb-6 text-foreground">
                  {paragraph.slice(3)}
                </h2>
              )
            } else if (paragraph.startsWith('### ')) {
              return (
                <h3 key={index} className="text-xl md:text-2xl font-semibold mt-8 mb-4 text-foreground">
                  {paragraph.slice(4)}
                </h3>
              )
            } else if (paragraph.startsWith('- ')) {
              return (
                <li key={index} className="text-foreground leading-relaxed mb-2">
                  {paragraph.slice(2)}
                </li>
              )
            } else if (trimmed === '---') {
              return <hr key={index} className="my-8 border-border" />
            } else if (trimmed === '') {
              return <div key={index} className="h-4" />
            } else if (paragraph.startsWith('*') && paragraph.endsWith('*') && paragraph.length > 2) {
              return (
                <p key={index} className="text-foreground leading-relaxed mb-6 text-lg italic text-center">
                  {paragraph.slice(1, -1)}
                </p>
              )
            } else {
              return (
                <p key={index} className="text-foreground leading-relaxed mb-6 text-lg">
                  {paragraph}
                </p>
              )
            }
          })}
        </article>

        {/* Author Section */}
        <div className="mt-16 pt-8 border-t border-border">
          <div className="flex items-center space-x-4">
            <ProtectedImage
              src={post.authorImage}
              alt={post.author}
              width={64}
              height={64}
              className="rounded-full"
            />
            <div>
              <h3 className="text-lg font-semibold text-foreground">Written by {post.author}</h3>
              <p className="text-muted-foreground">Mechanical Engineer passionate about automotive innovation and sustainable technology.</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-12 pt-8 border-t border-border">
          <Link href="/#blogs">
            <Button className="w-full md:w-auto">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to All Blogs
            </Button>
          </Link>
        </div>
      </main>
    </div>
  )
}

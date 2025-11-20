import { blogs } from '../blogData'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  return blogs.map((blog) => ({
    slug: blog.slug,
  }))
}

export async function generateMetadata({ params }) {
  const blog = blogs.find(b => b.slug === params.slug)
  if (!blog) return {}
  return {
    title: blog.seo.title,
    description: blog.seo.description,
    keywords: blog.seo.keywords,
    openGraph: {
      title: blog.seo.title,
      description: blog.seo.description,
      images: [
        { url: blog.seo.ogImage, width: 1200, height: 630, alt: blog.title }
      ]
    },
    alternates: {
      canonical: `/blog/${blog.slug}`
    }
  }
}

export default function BlogDetailPage({ params }) {
  const blog = blogs.find(b => b.slug === params.slug)
  if (!blog) return notFound()
  
  return (
    <div className="min-h-screen bg-gray-50">
      <article className="max-w-3xl mx-auto py-12 px-4">
        <Link 
          href="/blog" 
          className="inline-flex items-center text-emerald-600 hover:text-emerald-700 mb-6 font-medium transition-colors"
        >
          ← Back to Blog
        </Link>
        
        <header className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            {blog.title}
          </h1>
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <span>eSignTap Team</span>
            <span>•</span>
            <span>Updated recently</span>
          </div>
        </header>
        
        <div className="mb-8">
          <img 
            src={blog.image} 
            alt={blog.title} 
            className="w-full rounded-xl shadow-lg" 
          />
        </div>
        
        <div 
          className="prose prose-lg prose-emerald max-w-none bg-white rounded-xl p-8 shadow-sm"
          dangerouslySetInnerHTML={{ __html: blog.content }} 
        />
      </article>
    </div>
  )
}

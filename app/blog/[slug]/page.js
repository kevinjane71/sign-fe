import { blogs } from '../blogData'
import Link from 'next/link'
import Head from 'next/head'
import { notFound } from 'next/navigation'

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
    <div className="max-w-2xl mx-auto py-10 px-4">
      <Head>
        <title>{blog.seo.title}</title>
        <meta name="description" content={blog.seo.description} />
        <meta name="keywords" content={blog.seo.keywords} />
        <meta property="og:title" content={blog.seo.title} />
        <meta property="og:description" content={blog.seo.description} />
        <meta property="og:image" content={blog.seo.ogImage} />
        <meta property="og:type" content="article" />
        <link rel="canonical" href={`/blog/${blog.slug}`} />
      </Head>
      <Link href="/blog" className="text-blue-600 hover:underline mb-6 inline-block">← Back to Blog</Link>
      <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
      <img src={blog.image} alt={blog.title} className="w-full rounded-xl mb-6" />
      <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: blog.content }} />
    </div>
  )
} 
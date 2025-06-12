import { blogs } from './blogData'
import Link from 'next/link'
import Head from 'next/head'

export const metadata = {
  title: 'eSignTap Blog | Digital Signature, DocuSign Comparison, Features',
  description: 'Read the latest on e-signatures, DocuSign alternatives, pricing, and digital signing features. eSignTap blog for business and tech.',
  keywords: 'esignature blog, docusign comparison, digital signature, esigntap, pricing, features',
  openGraph: {
    title: 'eSignTap Blog',
    description: 'eSignTap blog: digital signature, DocuSign comparison, pricing, features, and more.',
    url: '/blog',
    images: [
      { url: '/blog/og-blog-listing.jpg', width: 1200, height: 630, alt: 'eSignTap Blog' }
    ]
  }
}

export default function BlogPage() {
  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords} />
        <meta property="og:title" content={metadata.openGraph.title} />
        <meta property="og:description" content={metadata.openGraph.description} />
        <meta property="og:image" content={metadata.openGraph.images[0].url} />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="/blog" />
      </Head>
      <h1 className="text-3xl font-bold mb-8 text-center">eSignTap Blog</h1>
      <div className="grid md:grid-cols-2 gap-8">
        {blogs.map(blog => (
          <div key={blog.slug} className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col">
            <img src={blog.image} alt={blog.title} className="w-full h-48 object-cover" />
            <div className="p-6 flex-1 flex flex-col">
              <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
              <p className="text-gray-600 mb-4 flex-1">{blog.excerpt}</p>
              <Link href={`/blog/${blog.slug}`} className="inline-block mt-auto text-blue-600 font-semibold hover:underline">Read more →</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 
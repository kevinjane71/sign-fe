import { blogs } from './blogData'
import Link from 'next/link'

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
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto py-12 px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">eSignTap Blog</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Insights on digital signatures, pricing comparisons, and best practices for document signing
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map(blog => (
            <Link 
              key={blog.slug} 
              href={`/blog/${blog.slug}`}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden flex flex-col group"
            >
              <div className="relative h-48 bg-emerald-100 overflow-hidden">
                <img 
                  src={blog.image} 
                  alt={blog.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                />
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h2 className="text-xl font-semibold mb-2 text-gray-900 group-hover:text-emerald-600 transition-colors">
                  {blog.title}
                </h2>
                <p className="text-gray-600 mb-4 flex-1 text-sm leading-relaxed">
                  {blog.excerpt}
                </p>
                <span className="inline-flex items-center text-emerald-600 font-medium text-sm group-hover:underline">
                  Read more →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

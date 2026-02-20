export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/dashboard/', '/editor/', '/preview/', '/sign/', '/billing/', '/profile/', '/contacts/', '/your-sign/', '/demo/', '/sign-complete/'],
      },
    ],
    sitemap: 'https://esigntap.com/sitemap.xml',
  }
}

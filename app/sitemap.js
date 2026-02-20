import { getAllPages } from './utils/pageRegistry'

export default function sitemap() {
  return getAllPages().map((page) => ({
    url: page.url,
    lastModified: new Date(),
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }))
}

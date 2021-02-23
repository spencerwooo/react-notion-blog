import { Feed } from 'feed'
import { Post } from '../pages/index'
import { formatSlug } from './slugFormat'

const domain = 'https://blog.spencerwoo.com'

export const generateRss = (posts: Post[]) => {
  const year = new Date().getFullYear()
  const feed = new Feed({
    id: domain,
    link: domain,
    title: "Spencer's Blog",
    copyright: `All rights reserved ${year}, Spencer Woo`,
    image: `${domain}/favicon.png`,
    favicon: `${domain}/favicon.ico`,
    author: {
      name: 'Spencer Woo',
      email: 'spencer.wushangbo@gmail.com',
      link: 'https://spencerwoo.com'
    }
  })

  posts.forEach(post => {
    if (post.published) {
      feed.addItem({
        title: post.name,
        id: `${domain}${formatSlug(post.date, post.slug)}`,
        link: `${domain}${formatSlug(post.date, post.slug)}`,
        description: post.preview,
        date: new Date(post.date)
      })
    }
  })

  return feed.rss2()
}

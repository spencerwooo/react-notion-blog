import { Feed } from 'feed'
import { Post } from '../pages/index'
import { formatSlug } from './slugFormat'

export const generateRss = (posts: Post[]) => {
  const year = new Date().getFullYear()
  const feed = new Feed({
    id: 'https://blog.spencerwoo.com/',
    link: 'https://blog.spencerwoo.com/',
    title: "Spencer's Blog",
    copyright: `All rights reserved ${year}, Spencer Woo`,
    image: '/favicon.png',
    favicon: '/favicon.ico',
    author: {
      name: 'Spencer Woo',
      email: 'spencer.wushangbo@gmail.com',
      link: 'https://spencerwoo.com'
    }
  })

  posts.forEach(post => {
    feed.addItem({
      title: post.name,
      id: post.id,
      link: formatSlug(post.date, post.slug),
      description: post.preview,
      date: new Date(post.date)
    })
  })

  return feed.rss2()
}

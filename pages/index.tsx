import axios from 'axios'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import PostCard from '../components/PostCard'
import { formatSlug } from '../utils/slugFormat'

const NOTION_BLOG_ID = process.env.NOTION_BLOG_ID || '7021cba3b8a04865850473d4037762ad'

export interface Author {
  id: string
  firstName: string
  lastName: string
  fullName: string
  profilePhoto: string
}

export interface Post {
  id: string
  name: string
  tag: string
  published: boolean
  date: string
  slug: string
  author: Author[]
  preview: string
  views: number
}

export const getAllPosts = async (): Promise<Post[]> => {
  return await axios.get(`https://notion-api.splitbee.io/v1/table/${NOTION_BLOG_ID}`).then(res => res.data)
}

export const getPostView = async (slug: string): Promise<number> => {
  return await axios
    .get('https://api.splitbee.io/v1/blog.spencerwoo.com/pageviews', {
      params: { page: slug },
      headers: { 'x-api-key': process.env.SPLITBEE_API_TOKEN }
    })
    .then(res => res.data.count)
}

export const getStaticProps = async () => {
  const posts = (await getAllPosts()).filter(p => p.published)
  await Promise.all(
    posts.map(async p => {
      p.views = await getPostView(formatSlug(p.date, p.slug))
    })
  )

  return {
    props: {
      posts
    },
    revalidate: 60
  }
}

const HomePage = ({ posts }: { posts: Post[] }) => {
  return (
    <>
      <Head>
        <title>Spencer&apos;s Blog</title>
      </Head>
      <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 justify-center flex-grow max-w-3xl">
          <Navbar />

          <div className="my-16">
            <div className="inline-block shadow-lg rounded-full w-18 h-18">
              <img className="rounded-full" src="/images/avatar.png" alt="avatar" width="100%" height="100%" />
            </div>
            <div className="mt-8 text-2xl font-bold dark:text-white">Spencer&apos;s Blog</div>
            <div className="mt-2 text-gray-400">
              Check out{' '}
              <Link href="/friends">
                <a className="text-purple-400 hover:text-purple-300 rounded">Friends & Guestbook</a>
              </Link>{' '}
              if you want to drop by and say hello!
            </div>

            <div className="mt-12 leading-loose flex flex-col space-y-4">
              {posts.map(post => post.published && <PostCard key={post.id} post={post} />)}
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  )
}

export default HomePage

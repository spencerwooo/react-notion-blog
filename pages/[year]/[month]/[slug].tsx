import { DiscussionEmbed } from 'disqus-react'
import { ArrowLeftOutline, CalendarOutline, ChevronLeftOutline, ChevronRightOutline } from 'heroicons-react'
import Head from 'next/head'
import Link from 'next/link'
import 'prismjs/themes/prism-tomorrow.css'
import { FC } from 'react'
import { BlockMapType, NotionRenderer } from 'react-notion'
import 'react-notion/src/styles.css'
import { getAllPosts, Post } from '../..'
import Footer from '../../../components/Footer'
import { formatSlug } from '../../../utils/slugFormat'

export interface Pagination {
  prev: Post | null
  next: Post | null
}

export const getStaticProps = async ({ params: { slug } }: { params: { slug: string } }) => {
  // Get all posts again
  const posts = (await getAllPosts()).filter(p => p.published)

  // Find the current blogpost by slug
  const postIndex = posts.findIndex(t => t.slug === slug)
  const post = posts[postIndex]

  const pagination: Pagination = {
    prev: postIndex - 1 >= 0 ? posts[postIndex - 1] : null,
    next: postIndex + 1 < posts.length ? posts[postIndex + 1] : null
  }

  const blocks = await fetch(`https://notion-api.splitbee.io/v1/page/${post!.id}`).then(res => res.json())

  return {
    props: {
      blocks,
      post,
      pagination
    },
    revalidate: 1
  }
}

const BlogPost: FC<{ post: Post; blocks: BlockMapType; pagination: Pagination }> = ({
  post,
  blocks,
  pagination
}: {
  post: Post
  blocks: BlockMapType
  pagination: Pagination
}) => {
  if (!post) return null

  return (
    <>
      <Head>
        <title>{post.name} - Spencer&apos;s Blog</title>
        <script async src="https://analytics.spencerwoo.com/sb.js" data-token="P4NLW57KW58Z"></script>
      </Head>
      <div className="min-h-screen flex flex-col">
        <div className="container mx-auto px-6 justify-center flex-grow max-w-4xl">
          <nav className="mt-4 inline-block">
            <Link href="/">
              <a className="flex items-center -ml-2 p-2 rounded lg:hover:bg-gray-100">
                <ArrowLeftOutline size={20} className="mr-4" />
                <span>Home</span>
              </a>
            </Link>
          </nav>

          <div className="my-16 mx-auto max-w-3xl">
            <div className="mb-12 text-center">
              <div className="text-3xl font-bold mb-3">{post.name}</div>
              <div className="text-sm text-gray-400 flex flex-nowrap justify-center items-center space-x-2 overflow-hidden">
                <CalendarOutline size={16} className="flex-shrink-0" />
                <span className="flex-shrink-0">{new Date(post.date).toLocaleDateString()} · </span>
                {post.author.map(author => (
                  <div key={author.id} className="flex items-center space-x-1 flex-shrink-0">
                    <img src={author.profilePhoto} alt="profile photo" className="w-6 h-6 rounded-full" />
                    <span className="hidden md:block">{author.fullName}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="overflow-hidden">
              <NotionRenderer blockMap={blocks} />
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
              {pagination.prev && (
                <Link href="/[year]/[month]/[slug]" as={formatSlug(pagination.prev.date, pagination.prev.slug)}>
                  <a className="p-3 border-2 hover:bg-gray-50 flex items-center justify-between space-x-2">
                    <ChevronLeftOutline size={20} />
                    <span>{pagination.prev?.name}</span>
                  </a>
                </Link>
              )}
              {pagination.next && (
                <Link href="/[year]/[month]/[slug]" as={formatSlug(pagination.next.date, pagination.next.slug)}>
                  <a className="p-3 border-2 hover:bg-gray-50 flex items-center justify-between space-x-2">
                    <span>{pagination.next?.name}</span>
                    <ChevronRightOutline size={20} />
                  </a>
                </Link>
              )}
            </div>

            <div className="mt-8 pt-2 border-t-2">
              <DiscussionEmbed shortname="spencerwoo" config={{ identifier: formatSlug(post.date, post.slug) }} />
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  )
}

export const getStaticPaths = async () => {
  const table = (await getAllPosts()).filter(p => p.published)
  return {
    paths: table.map(row => formatSlug(row.date, row.slug)),
    fallback: true
  }
}

export default BlogPost

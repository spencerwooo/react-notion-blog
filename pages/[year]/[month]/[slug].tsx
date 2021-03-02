import { DiscussionEmbed } from 'disqus-react'
import { ArrowLeftOutline, CalendarOutline, ChevronLeftOutline, ChevronRightOutline, TagOutline } from 'heroicons-react'
import Head from 'next/head'
import Link from 'next/link'
import { NotionAPI } from 'notion-client'
import { ExtendedRecordMap } from 'notion-types'
import { FC } from 'react'
import { Code, Equation, NotionRenderer } from 'react-notion-x'
import { getAllPosts, Post } from '../..'
import Footer from '../../../components/Footer'
import Navbar from '../../../components/Navbar'
import { formatSlug } from '../../../utils/slugFormat'

const notion = new NotionAPI()

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

  const recordMap = await notion.getPage(post!.id)

  return {
    props: {
      recordMap,
      post,
      pagination
    },
    revalidate: 1
  }
}

const BlogPost: FC<{ recordMap: ExtendedRecordMap; post: Post; pagination: Pagination }> = ({
  recordMap,
  post,
  pagination
}: {
  recordMap: ExtendedRecordMap
  post: Post
  pagination: Pagination
}) => {
  if (!post) return null

  return (
    <>
      <Head>
        <title>{post.name} - Spencer&apos;s Blog</title>
      </Head>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <div className="container mx-auto px-6 justify-center flex-grow max-w-3xl">
          {/* <nav className="mt-4 inline-block">
            <Link href="/">
              <a className="flex items-center -ml-2 p-2 rounded lg:hover:bg-gray-100">
                <ArrowLeftOutline size={20} className="mr-4" />
                <span>Home</span>
              </a>
            </Link>
          </nav> */}
          <Navbar />

          <div className="my-16">
            <div className="overflow-hidden py-2 sm:p-8 border-2 bg-white border-gray-100 rounded">
              <div className="mb-12 mt-4 px-3">
                <div className="inline-block text-blue-800 bg-blue-100 px-2 py-1 rounded">
                  <div className="flex items-center space-x-1">
                    <TagOutline size={16} /> <span>{post.tag}</span>
                  </div>
                </div>
                <div className="text-3xl font-bold my-3">{post.name}</div>
                <div className="text-sm text-gray-400 flex flex-nowrap items-center space-x-2 overflow-hidden">
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
              <NotionRenderer recordMap={recordMap} components={{ code: Code, equation: Equation }} />
            </div>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
              {pagination.prev && (
                <Link href="/[year]/[month]/[slug]" as={formatSlug(pagination.prev.date, pagination.prev.slug)}>
                  <a className="p-3 border-2 border-gray-100 hover:bg-gray-50 flex items-center justify-between space-x-2">
                    <ChevronLeftOutline size={20} />
                    <span>{pagination.prev?.name}</span>
                  </a>
                </Link>
              )}
              {pagination.next && (
                <Link href="/[year]/[month]/[slug]" as={formatSlug(pagination.next.date, pagination.next.slug)}>
                  <a className="p-3 border-2 border-gray-100 hover:bg-gray-50 flex items-center justify-between space-x-2">
                    <span>{pagination.next?.name}</span>
                    <ChevronRightOutline size={20} />
                  </a>
                </Link>
              )}
            </div>

            <div className="mt-8">
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

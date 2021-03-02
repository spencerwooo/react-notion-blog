import { DiscussionEmbed } from 'disqus-react'
import Head from 'next/head'
import { NotionAPI } from 'notion-client'
import { ExtendedRecordMap } from 'notion-types'
import { FC } from 'react'
import { Code, Equation, NotionRenderer } from 'react-notion-x'
import { getAllPosts, Post } from '../..'
import Footer from '../../../components/Footer'
import Navbar from '../../../components/Navbar'
import Pagination, { PaginationType } from '../../../components/Pagination'
import PostTitle from '../../../components/PostTitle'
import { formatSlug } from '../../../utils/slugFormat'

const notion = new NotionAPI()

export const getStaticProps = async ({ params: { slug } }: { params: { slug: string } }) => {
  // Get all posts again
  const posts = (await getAllPosts()).filter(p => p.published)

  // Find the current blogpost by slug
  const postIndex = posts.findIndex(t => t.slug === slug)
  const post = posts[postIndex]

  const pagination: PaginationType = {
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

const BlogPost: FC<{ recordMap: ExtendedRecordMap; post: Post; pagination: PaginationType }> = ({
  recordMap,
  post,
  pagination
}: {
  recordMap: ExtendedRecordMap
  post: Post
  pagination: PaginationType
}) => {
  if (!post) return null

  return (
    <>
      <Head>
        <title>{post.name} - Spencer&apos;s Blog</title>
      </Head>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <div className="container mx-auto px-6 justify-center flex-grow max-w-3xl">
          <Navbar />

          <div className="my-16">
            <div className="overflow-hidden py-2 sm:p-8 border-2 bg-white border-gray-100 rounded">
              <PostTitle post={post} />
              <NotionRenderer recordMap={recordMap} components={{ code: Code, equation: Equation }} />
            </div>

            <Pagination pagination={pagination} />

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

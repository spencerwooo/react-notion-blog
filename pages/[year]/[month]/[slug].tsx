import { DiscussionEmbed } from 'disqus-react'
// import useDarkMode from 'use-dark-mode'
import Head from 'next/head'
import { NotionAPI } from 'notion-client'
import { ExtendedRecordMap } from 'notion-types'
import { FC } from 'react'
import { Code, Equation, NotionRenderer } from 'react-notion-x'
import { getAllPosts, getPostView, Post } from '../..'
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

  // Get page views from current post
  post.views = await getPostView(formatSlug(post.date, post.slug))

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
    revalidate: 60
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

  // const darkMode = useDarkMode(false, { classNameDark: 'dark-mode' })

  return (
    <>
      <Head>
        <title>{post.name} - Spencer&apos;s Blog</title>
      </Head>
      <div className="min-h-screen flex flex-col">
        <div className="container mx-auto max-w-3xl">
          <Navbar />
        </div>

        <div className="container mx-auto mb-6 md:my-6 px-4 sm:px-6 justify-center flex-grow max-w-3xl bg-base-100 sm:bg-base-200 rounded">
          <div className="my-8">
            <PostTitle post={post} />

            <div className="overflow-hidden md:p-2 sm:bg-base-100 rounded">
              <NotionRenderer
                recordMap={recordMap}
                components={{ code: Code, equation: Equation }}
                // darkMode={darkMode.value}
              />
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

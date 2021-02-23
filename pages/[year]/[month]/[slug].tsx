import { CalendarOutline, HomeOutline } from 'heroicons-react'
import Link from 'next/link'
import 'prismjs/themes/prism-tomorrow.css'
import { FC } from 'react'
import { BlockMapType, NotionRenderer } from 'react-notion'
import 'react-notion/src/styles.css'
import { getAllPosts, Post } from '../..'
import Footer from '../../../components/Footer'
import { formatSlug } from '../../util'

export const getStaticProps = async ({ params: { slug } }: { params: { slug: string } }) => {
  // Get all posts again
  const posts = await getAllPosts()

  // Find the current blogpost by slug
  const post = posts.find(t => t.slug === slug)

  const blocks = await fetch(`https://notion-api.splitbee.io/v1/page/${post!.id}`).then(res => res.json())

  return {
    props: {
      blocks,
      post
    }
  }
}

const BlogPost: FC<{ post: Post; blocks: BlockMapType }> = ({ post, blocks }: { post: Post; blocks: BlockMapType }) => {
  if (!post) return null

  return (
    <div className="min-h-screen flex flex-col">
      <div className="container mx-auto px-6 justify-center flex-grow max-w-4xl">
        <nav className="mt-4 inline-block">
          <Link href="/">
            <a className="flex -ml-2 p-2 rounded lg:hover:bg-gray-100">
              <HomeOutline className="mr-4" />
              <span>Home</span>
            </a>
          </Link>
        </nav>

        <div className="my-16 mx-auto max-w-3xl">
          <div className="mb-12 text-center">
            <div className="text-3xl font-bold mb-3">{post.name}</div>
            <div className="text-sm text-gray-600 flex items-center justify-center space-x-1">
              <div className="flex items-center">
                <CalendarOutline size={16} className="mr-2" />
                <span>{new Date(post.date).toLocaleDateString()} · </span>
              </div>
              {post.author.map(author => (
                <div key={author.id} className="flex items-center space-x-1">
                  <img src={author.profilePhoto} alt="profile photo" className="w-6 h-6" />
                  <span>{author.fullName}</span>
                </div>
              ))}
            </div>
          </div>
          <NotionRenderer blockMap={blocks} />
        </div>
      </div>

      <Footer />
    </div>
  )
}

export const getStaticPaths = async () => {
  const table = await getAllPosts()
  return {
    paths: table.map(row => formatSlug(row.date, row.slug)),
    fallback: true
  }
}

export default BlogPost

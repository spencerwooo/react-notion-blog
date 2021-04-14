import { CalendarIcon, EyeIcon, TagIcon } from '@heroicons/react/outline'
import Link from 'next/link'
import { Post } from '../pages/index'
import { formatSlug } from '../utils/slugFormat'

const PostCard = ({ post }: { post: Post }) => {
  return (
    <Link href="/[year]/[month]/[slug]" as={formatSlug(post.date, post.slug)}>
      <a className="p-4 sm:p-6 border-2 border-gray-100 bg-white rounded transition transform dark:bg-gray-800 dark:border-gray-700 dark:text-white hover:-translate-y-1 hover:shadow-md">
        <div className="rounded mb-2 px-2 py-1 text-blue-800 bg-blue-100 text-sm inline-block dark:text-yellow-400 dark:bg-gray-700">
          <div className="flex items-center space-x-1">
            <TagIcon className="w-5 h-5" /> <span>{post.tag}</span>
          </div>
        </div>

        <div className="font-bold text-xl mb-1">{post.name}</div>
        <div className="text-sm text-gray-400 mb-2">{post.preview}</div>

        <div className="text-sm text-gray-400 flex flex-nowrap items-center space-x-2 overflow-hidden">
          <div className="flex items-center space-x-1">
            <CalendarIcon className="w-5 h-5" />
            <span className="flex-shrink-0">{new Date(post.date).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center space-x-1">
            <EyeIcon className="w-5 h-5" />
            <span>{post.views}</span>
          </div>
          {post.author.map(author => (
            <div key={author.id} className="flex items-center space-x-1 flex-shrink-0">
              <img src={author.profilePhoto} alt="profile photo" className="w-6 h-6 rounded-full" />
              <span className="hidden md:block">{author.fullName}</span>
            </div>
          ))}
        </div>
      </a>
    </Link>
  )
}

export default PostCard

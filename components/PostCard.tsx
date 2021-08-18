import { CalendarIcon, EyeIcon, TagIcon } from '@heroicons/react/outline'
import Link from 'next/link'
import { Post } from '../pages/index'
import { formatSlug } from '../utils/slugFormat'

const PostCard = ({ post }: { post: Post }) => {
  return (
    <Link href="/[year]/[month]/[slug]" as={formatSlug(post.date, post.slug)}>
      <a className="card compact bordered rounded transition transform hover:-translate-y-1">
        <div className="card-body bg-base-100">
          <div className="badge badge-primary">
            <TagIcon className="w-3 h-3 mr-1" />
            <span>{post.tag}</span>
          </div>

          <div className="card-title mt-2">{post.name}</div>
          <div className="text-sm text-neutral mb-2">{post.preview}</div>

          <div className="text-sm text-neutral flex flex-nowrap items-center space-x-2 overflow-hidden">
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
        </div>
      </a>
    </Link>
  )
}

export default PostCard

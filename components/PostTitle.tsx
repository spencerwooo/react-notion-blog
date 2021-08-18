import { CalendarIcon, EyeIcon, TagIcon } from '@heroicons/react/outline'
import { Post } from '../pages'

const PostTitle = ({ post }: { post: Post }) => {
  return (
    <div className="mb-8 mt-4 px-3">
      <div className="badge badge-primary">
        <div className="flex items-center space-x-1">
          <TagIcon className="w-4 h-4" /> <span>{post.tag}</span>
        </div>
      </div>

      <div className="text-2xl font-bold my-3">{post.name}</div>

      <div className="text-sm text-neutral flex flex-nowrap items-center space-x-2 overflow-hidden">
        <div className="flex items-center space-x-1">
          <CalendarIcon className="w-5 h-5" />
          <span>{new Date(post.date).toLocaleDateString()}</span>
        </div>
        <span>·</span>

        <div className="flex items-center space-x-1">
          <EyeIcon className="w-5 h-5" />
          <span>{post.views}</span>
        </div>
        <span>·</span>

        {post.author.map(author => (
          <div key={author.id} className="flex items-center space-x-1 flex-shrink-0">
            <img src={author.profilePhoto} alt="profile photo" className="w-6 h-6 rounded-full" />
            <span className="hidden md:block">{author.fullName}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PostTitle

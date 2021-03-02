import { CalendarOutline, TagOutline } from 'heroicons-react'
import { Post } from '../pages'

const PostTitle = ({ post }: { post: Post }) => {
  return (
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
  )
}

export default PostTitle

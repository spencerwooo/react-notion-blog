import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline'
import Link from 'next/link'
import { Post } from '../pages'
import { formatSlug } from '../utils/slugFormat'

export interface PaginationType {
  prev: Post | null
  next: Post | null
}

const Pagination = ({ pagination }: { pagination: PaginationType }) => {
  return (
    <div className="md:mt-4 grid grid-cols-1 md:grid-cols-2 gap-2">
      {pagination.prev && (
        <Link href="/[year]/[month]/[slug]" as={formatSlug(pagination.prev.date, pagination.prev.slug)}>
          <a className="btn">
            <ChevronLeftIcon className="w-5 h-5" />
            <span>{pagination.prev?.name}</span>
          </a>
        </Link>
      )}
      {pagination.next && (
        <Link href="/[year]/[month]/[slug]" as={formatSlug(pagination.next.date, pagination.next.slug)}>
          <a className="btn">
            <span>{pagination.next?.name}</span>
            <ChevronRightIcon className="w-5 h-5" />
          </a>
        </Link>
      )}
    </div>
  )
}

export default Pagination

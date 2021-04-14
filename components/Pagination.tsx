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
    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
      {pagination.prev && (
        <Link href="/[year]/[month]/[slug]" as={formatSlug(pagination.prev.date, pagination.prev.slug)}>
          <a className="p-4 rounded border-2 border-gray-100 bg-white hover:border-gray-300 dark:bg-gray-800 dark:text-white dark:border-gray-700 dark:hover:border-gray-600 flex items-center justify-between space-x-2">
            <ChevronLeftIcon className="w-5 h-5" />
            <span>{pagination.prev?.name}</span>
          </a>
        </Link>
      )}
      {pagination.next && (
        <Link href="/[year]/[month]/[slug]" as={formatSlug(pagination.next.date, pagination.next.slug)}>
          <a className="p-4 rounded border-2 border-gray-100 bg-white hover:border-gray-300 dark:bg-gray-800 dark:text-white dark:border-gray-700 dark:hover:border-gray-600 flex items-center justify-between space-x-2">
            <span>{pagination.next?.name}</span>
            <ChevronRightIcon className="w-5 h-5" />
          </a>
        </Link>
      )}
    </div>
  )
}

export default Pagination

import { GetServerSideProps } from 'next'
import { FC } from 'react'
import { getAllPosts } from '.'
import { generateRss } from '../utils/generateRss'

const Feed: FC = () => null

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  if (res) {
    const posts = await getAllPosts()
    const xmlFeed = generateRss(posts)

    res.setHeader('Content-Type', 'text/xml')
    res.write(xmlFeed)
    res.end()
  }

  return {
    props: {}
  }
}

export default Feed

import Head from 'next/head'
import Image from 'next/image'

import headerImage from '../public/images/pluto-coming-soon.png'
import avatar from '../public/images/avatar.png'

const HomePage = () => {
  return (
    <>
      <Head>
        <title>Spencer&apos;s Blog</title>
      </Head>
      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 dark:bg-gray-900">
        <div className="flex-1 flex items-center p-4">
          <div className="rounded border p-8 bg-white dark:bg-gray-800 dark:border-gray-700 max-w-lg flex flex-col items-end">
            <Image src={headerImage} placeholder="blur" width={600} height={426} alt="new-domain" />
            <div className="my-8">
              hi there, we have moved / hi ann, tha sinn air gluasad / привет мы переехали / こんにちは、引っ越しました
              / 你好，我们搬家了 / 你好，我們搬家了 / hallo daar, we zijn verhuisd / bonjour, nous avons déménagé
            </div>

            <a
              href="https://spencerwoo.com/blog"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded border hover:bg-gray-200 dark:hover:bg-gray-700 dark:border-gray-600 flex items-center space-x-2"
            >
              <span>go check it out</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </div>
        </div>

        <div className="flex flex-col items-center p-4">
          <div className="w-16 h-16 border rounded-full">
            <Image src={avatar} alt="avatar" priority placeholder="blur" className="rounded-full w-16 h-16" />
          </div>
          <p>spencer woo at 2021</p>
        </div>
      </div>
    </>
  )
}

export default HomePage

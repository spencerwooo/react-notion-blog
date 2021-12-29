module.exports = {
  async redirects() {
    return [
      {
        source: '/posts/index.xml',
        destination: 'https://spencerwoo.com/feed',
        permanent: false
      },
      {
        source: '/feed.xml',
        destination: 'https://spencerwoo.com/feed',
        permanent: false
      },
      {
        source: '/feed',
        destination: 'https://spencerwoo.com/feed',
        permanent: false
      },
      {
        source: '/:year/:month/:slug*',
        destination: 'https://spencerwoo.com/blog/:slug*',
        permanent: false
      },
    ]
  }
}

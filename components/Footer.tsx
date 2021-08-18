const Footer = () => {
  const currentYear: number = new Date().getFullYear()

  return (
    <footer className="w-full mb-8 text-center">
      <div className="container mx-auto">
        <div>
          Powered by{' '}
          <a className="link" href="https://nextjs.org/">
            Next.js
          </a>
          ,{' '}
          <a className="link" href="https://tailwindcss.com/">
            Tailwind CSS
          </a>
          ,{' '}
          <a className="link" href="https://notion.so">
            Notion
          </a>{' '}
          and{' '}
          <a className="link" href="https://www.typescriptlang.org/">
            TypeScript.
          </a>
        </div>
        <div>Spencer Woo © 2017-{currentYear}</div>
      </div>
    </footer>
  )
}

export default Footer

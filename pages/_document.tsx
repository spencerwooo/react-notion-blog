import Document, { Head, Html, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html
        data-theme="garden"
        style={{
          backgroundImage:
            "url('data:image/svg+xml,%3Csvg%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%220%200%2040%2040%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Ctitle%3Ediagonal-stripes%3C%2Ftitle%3E%3Cg%20fill%3D%22%23black%22%20fill-opacity%3D%220.03%22%20fill-rule%3D%22evenodd%22%3E%3Cpath%20d%3D%22M0%2040L40%200H20L0%2020zM40%2040V20L20%2040z%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E')"
        }}
      >
        <Head>
          <script async src="https://analytics.spencerwoo.com/sb.js" data-token="P4NLW57KW58Z"></script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument

import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en" className="dark">
        <Head>
          {/* Google Fonts */}
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap"
            rel="stylesheet"
          />

          {/* Primary Meta Tags */}
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta
            name="title"
            content="Md. Hamim Howlader Asif | MERN Stack Developer Portfolio"
          />
          <meta
            name="description"
            content="Explore the professional portfolio of Md. Hamim Howlader Asif, a skilled MERN Stack developer specializing in full-stack web development using MongoDB, Express.js, React, and Node.js."
          />
          <meta
            name="keywords"
            content="MERN Stack Developer, React Developer, Node.js, MongoDB, Express, Full Stack Developer, JavaScript, Portfolio"
          />
          <meta name="author" content="Md. Hamim Howlader Asif" />
          <meta name="theme-color" content="#3B82F6" />

          {/* Open Graph / Facebook */}
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://hamim-portfolio.vercel.app/" />
          <meta
            property="og:title"
            content="Md. Hamim Howlader Asif | MERN Stack Developer"
          />
          <meta
            property="og:description"
            content="Discover projects and skills of MERN Stack Developer Hamim Howlader Asif."
          />
          <meta
            property="og:image"
            content="https://hamim-portfolio.vercel.app/icon/profile_image.jpg"
          />

          {/* Twitter */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:url" content="https://x.com/HamimWebDeV2004" />
          <meta
            name="twitter:title"
            content="Md. Hamim Howlader Asif | MERN Stack Developer"
          />
          <meta
            name="twitter:description"
            content="Discover projects and skills of MERN Stack Developer Hamim Howlader Asif."
          />
          <meta
            name="twitter:image"
            content="https://hamim-portfolio.vercel.app/icon/profile_image.jpg"
          />

          {/* Favicon */}
          <link rel="icon" href="/icon/profile_image.jpg" type="image/jpeg" />
        </Head>
        <body>
          <Main />
          <NextScript />
          {/* Ensure dark mode is always applied */}
          <script
            dangerouslySetInnerHTML={{
              __html: `
                document.documentElement.classList.add('dark');
                localStorage.setItem('theme', 'dark');
              `,
            }}
          />
        </body>
      </Html>
    );
  }
}

export default MyDocument;

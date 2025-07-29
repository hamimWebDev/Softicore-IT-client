

import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
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
            content="Softicore IT - Professional Web Development Services | Custom Websites & Digital Solutions"
          />
          <meta
            name="description"
            content="Softicore IT is a leading web development company specializing in custom websites, e-commerce solutions, and digital transformation. Get professional web development services with cutting-edge technology."
          />
          <meta
            name="keywords"
            content="web development, custom websites, e-commerce development, digital solutions, software development, web design, frontend development, backend development, React development, Node.js development, MongoDB, responsive design, SEO optimization, digital transformation"
          />
          <meta name="author" content="Softicore IT" />
          <meta name="theme-color" content="#3B82F6" />
          <meta name="robots" content="index, follow" />
          <meta name="language" content="English" />
          <meta name="revisit-after" content="7 days" />

          {/* Open Graph / Facebook */}
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://softicoreit.com/" />
          <meta
            property="og:title"
            content="Softicore IT - Professional Web Development Services"
          />
          <meta
            property="og:description"
            content="Transform your business with custom web development solutions. Professional websites, e-commerce platforms, and digital applications built with cutting-edge technology."
          />
          <meta
            property="og:image"
            content="https://softicoreit.com/icon/icon.png"
          />
          <meta property="og:site_name" content="Softicore IT" />
          <meta property="og:locale" content="en_US" />

          {/* Twitter */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:url" content="https://softicoreit.com/" />
          <meta
            name="twitter:title"
            content="Softicore IT - Professional Web Development Services"
          />
          <meta
            name="twitter:description"
            content="Transform your business with custom web development solutions. Professional websites, e-commerce platforms, and digital applications."
          />
          <meta
            name="twitter:image"
            content="https://softicoreit.com/icon/icon.png"
          />

          {/* Favicon */}
          <link rel="icon" href="/favicon.ico" sizes="any" />
          <link rel="icon" href="/icon/icon.png" type="image/png" />
          <link rel="apple-touch-icon" href="/icon/icon.png" />
          <link rel="shortcut icon" href="/favicon.ico" />

          {/* Mobile Web App Capable */}
          <meta name="mobile-web-app-capable" content="yes" />

          {/* Canonical URL */}
          <link rel="canonical" href="https://softicoreit.com/" />

          {/* Google Analytics */}
          <script
            async
            src="https://www.googletagmanager.com/gtag/js?id=G-BKGRMN3WW9"
          ></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-BKGRMN3WW9', {
                  page_path: window.location.pathname,
                });
              `,
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'https://softicoreit.com',
    generateRobotsTxt: true, // robots.txt ও জেনারেট করবে
    changefreq: 'weekly',
    priority: 0.7,
    sitemapSize: 5000,
    exclude: ['/dashboard', '/admin', '/api', '/_next', '/_next/static', '/_next/static/chunks', '/_next/static/chunks/pages', '/_next/static/chunks/app', '/_next/static/chunks/app/'],
    transform: async (config, path) => {
      return {
        loc: path,
        changefreq: path.includes('/blogs') ? 'weekly' : 'monthly',
        priority: path === '/' ? 1.0 : 0.7,
        lastmod: new Date().toISOString(),
      };
    },
  };
  
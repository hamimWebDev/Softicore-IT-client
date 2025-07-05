import { DefaultSeoProps } from 'next-seo';

// Default SEO configuration for the entire site
export const defaultSEOConfig: DefaultSeoProps = {
  titleTemplate: '%s | Softicore IT',
  defaultTitle: 'Softicore IT - Professional Web Development Services | Custom Websites & Digital Solutions',
  description: 'Softicore IT delivers cutting-edge web development solutions including custom websites, e-commerce platforms, and digital applications. Transform your business with our expert development team.',
  canonical: 'https://softicoreit.com/',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://softicoreit.com/',
    siteName: 'Softicore IT',
    title: 'Softicore IT - Professional Web Development Services',
    description: 'Transform your business with custom web development solutions. Professional websites, e-commerce platforms, and digital applications built with cutting-edge technology.',
    images: [
      {
        url: 'https://softicoreit.com/icon/icon.png',
        width: 1200,
        height: 630,
        alt: 'Softicore IT - Web Development Services',
      },
    ],
  },
  twitter: {
    handle: '@softicoreit',
    site: '@softicoreit',
    cardType: 'summary_large_image',
  },
  additionalMetaTags: [
    {
      name: 'keywords',
      content: 'web development, custom websites, e-commerce development, digital solutions, software development, web design, frontend development, backend development, React development, Node.js development, MongoDB, responsive design, SEO optimization, digital transformation',
    },
    {
      name: 'author',
      content: 'Softicore IT',
    },
    {
      name: 'robots',
      content: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
    },
    {
      name: 'language',
      content: 'English',
    },
    {
      name: 'revisit-after',
      content: '7 days',
    },
    {
      name: 'theme-color',
      content: '#3B82F6',
    },
    {
      name: 'msapplication-TileColor',
      content: '#3B82F6',
    },
    {
      name: 'apple-mobile-web-app-capable',
      content: 'yes',
    },
    {
      name: 'apple-mobile-web-app-status-bar-style',
      content: 'default',
    },
    {
      name: 'apple-mobile-web-app-title',
      content: 'Softicore IT',
    },
    {
      name: 'application-name',
      content: 'Softicore IT',
    },
    {
      name: 'format-detection',
      content: 'telephone=no',
    },
    {
      property: 'og:site_name',
      content: 'Softicore IT',
    },
    {
      property: 'og:locale',
      content: 'en_US',
    },
    {
      property: 'fb:pages',
      content: '', // Add your Facebook Page ID if you have one
    },
    {
      property: 'fb:app_id',
      content: 'https://www.facebook.com/softicoreit', // Add your Facebook App ID if you have one
    },
  ],
  additionalLinkTags: [
    {
      rel: 'icon',
      href: '/icon/icon.png',
    },
    {
      rel: 'apple-touch-icon',
      href: '/icon/icon.png',
    },
    {
      rel: 'canonical',
      href: 'https://softicoreit.com/',
    },
    {
      rel: 'manifest',
      href: '/manifest.json',
    },
    {
      rel: 'preconnect',
      href: 'https://fonts.googleapis.com',
    },
    {
      rel: 'preconnect',
      href: 'https://fonts.gstatic.com',
      crossOrigin: 'anonymous',
    },
  ],
};

// Page-specific SEO configurations
export const pageSEOConfigs = {
  home: {
    title: 'Professional Web Development Services | Custom Websites & Digital Solutions',
    description: 'Softicore IT delivers cutting-edge web development solutions including custom websites, e-commerce platforms, and digital applications. Transform your business with our expert development team.',
    canonical: 'https://softicoreit.com/',
    openGraph: {
      title: 'Softicore IT - Professional Web Development Services',
      description: 'Transform your business with custom web development solutions. Professional websites, e-commerce platforms, and digital applications built with cutting-edge technology.',
      url: 'https://softicoreit.com/',
    },
  },
  about: {
    title: 'About Us - Web Development Agency',
    description: 'Learn about Softicore IT, a leading web development agency specializing in modern web applications, e-commerce solutions, and digital transformation.',
    canonical: 'https://softicoreit.com/about',
    openGraph: {
      title: 'About Us | Softicore IT - Web Development Agency',
      description: 'Learn about Softicore IT, a leading web development agency specializing in modern web applications, e-commerce solutions, and digital transformation.',
      url: 'https://softicoreit.com/about',
    },
  },
  projects: {
    title: 'Our Projects - Web Development Portfolio',
    description: 'Explore our portfolio of successful web development projects including custom websites, e-commerce platforms, and digital applications. See how we\'ve helped businesses grow online.',
    canonical: 'https://softicoreit.com/projects',
    openGraph: {
      title: 'Our Projects | Softicore IT - Web Development Portfolio',
      description: 'Explore our portfolio of successful web development projects including custom websites, e-commerce platforms, and digital applications.',
      url: 'https://softicoreit.com/projects',
    },
  },
  projectDetails: {
    title: 'Project Details - Web Development Portfolio',
    description: 'Detailed view of our web development project showcasing technologies used, features implemented, and project outcomes.',
    canonical: 'https://softicoreit.com/projects/[id]',
    openGraph: {
      title: 'Project Details | Softicore IT - Web Development Portfolio',
      description: 'Detailed view of our web development project showcasing technologies used, features implemented, and project outcomes.',
      url: 'https://softicoreit.com/projects/[id]',
    },
  },
  blogs: {
    title: 'Blog - Web Development Insights & Tips',
    description: 'Stay updated with the latest web development trends, tips, and insights from Softicore IT. Read about React, Node.js, e-commerce development, and digital transformation strategies.',
    canonical: 'https://softicoreit.com/blogs',
    openGraph: {
      title: 'Blog | Softicore IT - Web Development Insights & Tips',
      description: 'Stay updated with the latest web development trends, tips, and insights from Softicore IT. Read about React, Node.js, e-commerce development, and digital transformation strategies.',
      url: 'https://softicoreit.com/blogs',
    },
  },
  contact: {
    title: 'Contact Us - Web Development Services',
    description: 'Get in touch with Softicore IT for professional web development services. Contact our expert team for custom websites, e-commerce solutions, and digital applications.',
    canonical: 'https://softicoreit.com/contact',
    openGraph: {
      title: 'Contact Us | Softicore IT - Web Development Services',
      description: 'Get in touch with Softicore IT for professional web development services. Contact our expert team for custom websites, e-commerce solutions, and digital applications.',
      url: 'https://softicoreit.com/contact',
    },
  },
};

// JSON-LD structured data configurations
export const structuredData = {
  organization: {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Softicore IT',
    url: 'https://softicoreit.com',
    logo: 'https://softicoreit.com/icon/icon.png',
    description: 'Professional web development company specializing in custom websites, e-commerce solutions, and digital applications.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Dhaka',
      addressCountry: 'Bangladesh',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+880-1234-567890',
      contactType: 'customer service',
      email: 'softicoreit@gmail.com',
    },
    sameAs: [
      'https://github.com/softicoreit',
      'https://linkedin.com/company/softicoreit',
      'https://twitter.com/softicoreit',
      'https://www.facebook.com/softicoreit',
    ],
    serviceType: 'Web Development',
    areaServed: 'Worldwide',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Web Development Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Custom Website Development',
            description: 'Professional custom websites built with modern technologies',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'E-commerce Development',
            description: 'Complete online store solutions with payment gateways',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Digital Applications',
            description: 'Custom web applications and digital solutions',
          },
        },
      ],
    },
  },
  website: {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Softicore IT',
    url: 'https://softicoreit.com',
    description: 'Professional web development services and digital solutions',
    publisher: {
      '@type': 'Organization',
      name: 'Softicore IT',
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://softicoreit.com/search?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  },
  localBusiness: {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Softicore IT',
    description: 'Professional web development company in Dhaka, Bangladesh',
    url: 'https://softicoreit.com',
    telephone: '+880-1234-567890',
    email: 'softicoreit@gmail.com',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Dhaka',
      addressCountry: 'Bangladesh',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 23.8103,
      longitude: 90.4125,
    },
    openingHours: 'Mo-Fr 09:00-18:00',
    priceRange: '$$',
    serviceType: 'Web Development',
  },
  breadcrumb: {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://softicoreit.com',
      },
    ],
  },
  faq: {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What web development services does Softicore IT offer?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Softicore IT offers comprehensive web development services including custom website development, e-commerce solutions, digital applications, and responsive web design using modern technologies like React, Node.js, and MongoDB.',
        },
      },
      {
        '@type': 'Question',
        name: 'How long does it take to complete a web development project?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Project timelines vary depending on complexity. Simple websites take 2-4 weeks, while complex e-commerce platforms may take 8-12 weeks. We provide detailed timelines during project planning.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do you provide ongoing support and maintenance?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, we provide 24/7 support and maintenance services to ensure your digital solutions run smoothly. This includes updates, security patches, and technical support.',
        },
      },
      {
        '@type': 'Question',
        name: 'What technologies do you use for web development?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We use modern technologies including React.js, Next.js, Node.js, MongoDB, TypeScript, and various cloud platforms. Our tech stack is chosen based on project requirements and scalability needs.',
        },
      },
    ],
  },
};

// Helper function to generate breadcrumb data
export const generateBreadcrumbData = (path: string, title: string) => {
  const baseBreadcrumb = [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: 'https://softicoreit.com',
    },
  ];

  if (path === '/') {
    return baseBreadcrumb;
  }

  return [
    ...baseBreadcrumb,
    {
      '@type': 'ListItem',
      position: 2,
      name: title,
      item: `https://softicoreit.com${path}`,
    },
  ];
};

// Helper function to generate service schema
export const generateServiceSchema = (serviceName: string, description: string) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: serviceName,
  description: description,
  provider: {
    '@type': 'Organization',
    name: 'Softicore IT',
  },
  areaServed: 'Worldwide',
  serviceType: 'Web Development',
}); 
"use client"

import { useEffect, useState } from "react";
import { NextPage } from "next";
import { motion, AnimatePresence } from "framer-motion";
import { NextSeo } from 'next-seo';
import Script from "next/script";
import BlogCard from "@/components/BlogCard";
import AnimatedSection from "@/components/AnimatedSection";
import { useGetAllblogsQuery } from "@/redux/features/Blogs/blogsApi";
import { pageSEOConfigs } from '@/lib/seo-config';

const Blogs: NextPage = () => {
  const { data: blogs, isLoading, isError } = useGetAllblogsQuery(undefined);
  const [visibleItems, setVisibleItems] = useState(6);
  const [blogList, setBlogList] = useState<any[]>([]);

  useEffect(() => {
    if (Array.isArray(blogs)) {
      setBlogList(blogs);
    }
  }, [blogs]);

  // Load more handler
  const loadMoreItem = () => {
    setVisibleItems((prev) => prev + 3);
  };

  return (
    <>
      <NextSeo
        title={pageSEOConfigs.blogs.title}
        description={pageSEOConfigs.blogs.description}
        canonical={pageSEOConfigs.blogs.canonical}
        openGraph={pageSEOConfigs.blogs.openGraph}
        additionalMetaTags={[
          {
            name: 'keywords',
            content: 'web development blog, React development tips, Node.js tutorials, e-commerce development, digital transformation, web design trends, SEO optimization',
          },
        ]}
      />

      {/* Structured Data for Blog */}
      <Script
        id="blog-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Blog',
            name: 'Softicore IT Blog',
            description: 'Web development insights, tips, and trends from Softicore IT',
            url: 'https://softicoreit.com/blogs',
            publisher: {
              '@type': 'Organization',
              name: 'Softicore IT',
              logo: {
                '@type': 'ImageObject',
                url: 'https://softicoreit.com/icon/icon.png',
              },
            },
            blogPost: blogList.slice(0, 10).map((blog) => ({
              '@type': 'BlogPosting',
              headline: blog.title,
              description: blog.content?.slice(0, 200) || 'Web development article',
              author: {
                '@type': 'Organization',
                name: 'Softicore IT',
              },
              datePublished: blog.createdAt || new Date().toISOString(),
              dateModified: blog.updatedAt || new Date().toISOString(),
              url: `https://softicoreit.com/blog/${blog.id}`,
            })),
          }),
        }}
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
      >
        <section className="pt-32 pb-8 md:pt-40 md:pb-12 bg-gradient-to-r from-blue-100 via-purple-50 to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Our Blog
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                Insights, tips, and trends in web development and digital solutions.
              </p>
            </div>
          </div>
        </section>
        <section className="py-8 bg-gradient-to-r from-blue-100 via-purple-50 to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence>
                {blogList.slice(0, visibleItems).map((blog, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <BlogCard blog={blog} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            {visibleItems < blogList.length && (
              <div className="flex justify-center mt-8 sm:mt-12 lg:mt-16">
                <button
                  onClick={loadMoreItem}
                  className="btn btn-accent px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-medium rounded-full hover:scale-105 transition-all duration-300"
                >
                  Load More
                </button>
              </div>
            )}
          </div>
        </section>
      </motion.div>
    </>
  );
};

export default Blogs;

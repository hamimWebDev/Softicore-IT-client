"use client"

import { useEffect, useState } from "react";
import { NextPage } from "next";
import { motion, AnimatePresence } from "framer-motion";
import { NextSeo } from 'next-seo';
import Script from "next/script";
import { FaSearch, FaTimes } from "react-icons/fa";
import BlogCard from "@/components/BlogCard";
import AnimatedSection from "@/components/AnimatedSection";
import { useGetAllblogsQuery } from "@/redux/features/Blogs/blogsApi";
import { pageSEOConfigs } from '@/lib/seo-config';

const Blogs: NextPage = () => {
  const { data: blogs, isLoading, isError } = useGetAllblogsQuery(undefined);
  const [visibleItems, setVisibleItems] = useState(6);
  const [blogList, setBlogList] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBlogs, setFilteredBlogs] = useState<any[]>([]);

  useEffect(() => {
    if (Array.isArray(blogs)) {
      setBlogList(blogs);
      setFilteredBlogs(blogs);
    }
  }, [blogs]);

  // Search functionality
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredBlogs(blogList);
      setVisibleItems(6);
      return;
    }

    const filtered = blogList.filter((blog) => {
      const searchLower = searchTerm.toLowerCase();
      const titleMatch = blog.title?.toLowerCase().includes(searchLower);
      const contentMatch = blog.content?.toLowerCase().includes(searchLower);
      const authorMatch = blog.author?.toLowerCase().includes(searchLower);
      const tagsMatch = blog.tags?.some((tag: string) => 
        tag.toLowerCase().includes(searchLower)
      );

      return titleMatch || contentMatch || authorMatch || tagsMatch;
    });

    setFilteredBlogs(filtered);
    setVisibleItems(6); // Reset visible items when searching
  }, [searchTerm, blogList]);

  // Load more handler
  const loadMoreItem = () => {
    setVisibleItems((prev) => prev + 3);
  };

  // Clear search
  const clearSearch = () => {
    setSearchTerm("");
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
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
                Insights, tips, and trends in web development and digital solutions.
              </p>
              
              {/* Search Bar */}
              <div className="relative max-w-2xl mx-auto">
                <div className="relative">
                  <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
                  <input
                    type="text"
                    placeholder="Search blogs by title, content, author, or tags..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-12 py-4 text-lg border-2 border-gray-200 dark:border-gray-600 rounded-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 transition-colors duration-300"
                  />
                  {searchTerm && (
                    <button
                      onClick={clearSearch}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200"
                    >
                      <FaTimes className="text-lg" />
                    </button>
                  )}
                </div>
                
                {/* Search Results Info */}
                {searchTerm && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 text-center"
                  >
                    <p className="text-gray-600 dark:text-gray-400">
                      Found {filteredBlogs.length} result{filteredBlogs.length !== 1 ? 's' : ''} for "{searchTerm}"
                    </p>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-8 bg-gradient-to-r from-blue-100 via-purple-50 to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
          <div className="container-custom">
            {isLoading ? (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              </div>
            ) : isError ? (
              <div className="text-center py-20">
                <p className="text-red-600 dark:text-red-400 text-lg">
                  Error loading blogs. Please try again later.
                </p>
              </div>
            ) : filteredBlogs.length === 0 ? (
              <div className="text-center py-20">
                <div className="text-gray-400 dark:text-gray-500 text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  No blogs found
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {searchTerm 
                    ? `No blogs match your search for "${searchTerm}". Try different keywords.`
                    : "No blogs available at the moment."
                  }
                </p>
                {searchTerm && (
                  <button
                    onClick={clearSearch}
                    className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
                  >
                    Clear Search
                  </button>
                )}
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  <AnimatePresence>
                    {filteredBlogs.slice(0, visibleItems).map((blog, index) => (
                      <motion.div
                        key={blog._id || index}
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
                
                {visibleItems < filteredBlogs.length && (
                  <div className="flex justify-center mt-8 sm:mt-12 lg:mt-16">
                    <button
                      onClick={loadMoreItem}
                      className="btn btn-accent px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-medium rounded-full hover:scale-105 transition-all duration-300"
                    >
                      Load More
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </section>
      </motion.div>
    </>
  );
};

export default Blogs;

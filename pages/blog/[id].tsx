import { useRouter } from "next/router";
import { NextPage } from "next";
import { motion } from "framer-motion";
import { NextSeo } from 'next-seo';
import Script from "next/script";
import Image from "next/image";
import Link from "next/link";
import { FiArrowLeft, FiCalendar, FiTag, FiUser, FiShare2, FiBookOpen, FiClock } from "react-icons/fi";
import { useGetBlogByIdQuery } from "@/redux/features/Blogs/blogsApi";
import Badge from "@/components/ui/Badge";
import AnimatedSection from "@/components/AnimatedSection";
import { IBlog } from "@/components/BlogCard";

const BlogDetails: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  
  // Wait for router to be ready before making the query
  const { data: blog, isLoading, isError } = useGetBlogByIdQuery(id as string, {
    skip: !id || !router.isReady
  }) as { data: IBlog | undefined, isLoading: boolean, isError: boolean };

  // Show loading while router is not ready or data is loading
  if (!router.isReady || isLoading) {
    return (
      <div className="pt-32 pb-16 min-h-screen bg-gradient-to-r from-blue-100 via-purple-50 to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container-custom">
          <div className="max-w-6xl mx-auto">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-4"></div>
              <div className="h-96 bg-gray-200 dark:bg-gray-700 rounded mb-8"></div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-4"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                </div>
                <div className="lg:col-span-1">
                  <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
                  <div className="h-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show error if no ID or blog not found
  if (!id || isError || !blog) {
    return (
      <div className="pt-32 pb-16 min-h-screen bg-gradient-to-r from-blue-100 via-purple-50 to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-100 dark:border-gray-700">
              <div className="w-20 h-20 mx-auto mb-6 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center">
                <svg
                  className="w-10 h-10 text-red-600 dark:text-red-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Blog Not Found
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                The blog you're looking for doesn't exist or has been removed.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => window.location.reload()}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-full hover:bg-primary-700 transition-all duration-300 hover:scale-105 shadow-lg"
                >
                  <FiArrowLeft className="w-4 h-4 rotate-180" />
                  Try Again
                </button>
                <Link
                  href="/blogs"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300"
                >
                  <FiArrowLeft className="w-4 h-4" />
                  Back to Blogs
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Calculate reading time (rough estimate: 200 words per minute)
  const wordCount = blog.content?.split(/\s+/).length || 0;
  const readingTime = Math.ceil(wordCount / 200);

  return (
    <>
      <NextSeo
        title={`${blog.title} - Blog | Softicore IT`}
        description={blog.content?.slice(0, 160) || 'Web development insights and tips'}
        canonical={`https://softicoreit.com/blog/${blog._id}`}
        openGraph={{
          title: `${blog.title} - Blog`,
          description: blog.content?.slice(0, 160) || 'Web development insights and tips',
          url: `https://softicoreit.com/blog/${blog._id}`,
          images: [
            {
              url: blog.coverImage || '/default-avatar.png',
              width: 1200,
              height: 630,
              alt: blog.title,
            },
          ],
          type: 'article',
          article: {
            publishedTime: typeof blog.createdAt === 'string' ? blog.createdAt : blog.createdAt?.toISOString(),
            modifiedTime: typeof blog.updatedAt === 'string' ? blog.updatedAt : blog.updatedAt?.toISOString(),
            authors: [blog.author],
            tags: blog.tags,
          },
        }}
      />

      {/* Structured Data for Blog Post */}
      <Script
        id="blog-post-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: blog.title,
            description: blog.content?.slice(0, 200) || 'Web development article',
            image: blog.coverImage || '/default-avatar.png',
            author: {
              '@type': 'Person',
              name: blog.author,
            },
            publisher: {
              '@type': 'Organization',
              name: 'Softicore IT',
              logo: {
                '@type': 'ImageObject',
                url: 'https://softicoreit.com/icon/icon.png',
              },
            },
            datePublished: blog.createdAt,
            dateModified: blog.updatedAt,
            wordCount: wordCount,
            timeRequired: `PT${readingTime}M`,
            keywords: blog.tags?.join(', '),
            url: `https://softicoreit.com/blog/${blog._id}`,
          }),
        }}
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="pt-32 pb-16 min-h-screen bg-gradient-to-r from-blue-100 via-purple-50 to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"
      >
        <div className="container-custom">
          <div className="max-w-6xl mx-auto">
            {/* Breadcrumb Navigation */}
            <AnimatedSection direction="left" delay={0.1}>
              <nav className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-8">
                <Link href="/" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  Home
                </Link>
                <span>/</span>
                <Link href="/blogs" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  Blogs
                </Link>
                <span>/</span>
                <span className="text-gray-900 dark:text-white font-medium truncate">{blog.title}</span>
              </nav>
            </AnimatedSection>

            {/* Blog Image */}
            <AnimatedSection direction="up" delay={0.3}>
              <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-xl border border-gray-100 dark:border-gray-700 mb-8 group">
                <div className="relative w-full h-96 md:h-[500px]">
                  <Image
                    src={blog.coverImage || "/default-avatar.png"}
                    alt={blog.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                </div>
              </div>
            </AnimatedSection>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2">
                {/* Blog Header */}
                <AnimatedSection direction="up" delay={0.2}>
                  <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-100 dark:border-gray-700 mb-8">
                    <div className="flex items-center gap-3 mb-4">
                      {blog.tags?.slice(0, 3).map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400 text-sm">
                        <FiCalendar className="w-4 h-4" />
                        {new Date(blog.createdAt).toLocaleDateString(undefined, {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </div>
                    </div>

                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                      {blog.title}
                    </h1>

                    <div className="flex items-center gap-6 text-gray-600 dark:text-gray-400 mb-6">
                      <div className="flex items-center gap-2">
                        <FiUser className="w-4 h-4" />
                        <span className="font-medium">{blog.author}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FiClock className="w-4 h-4" />
                        <span>{readingTime} min read</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FiBookOpen className="w-4 h-4" />
                        <span>{wordCount} words</span>
                      </div>
                    </div>

                    {/* Share Button */}
                    <button
                      onClick={() => {
                        if (navigator.share) {
                          navigator.share({
                            title: blog.title,
                            text: blog.content?.slice(0, 100),
                            url: window.location.href,
                          });
                        } else {
                          navigator.clipboard.writeText(window.location.href);
                          alert('Link copied to clipboard!');
                        }
                      }}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300"
                    >
                      <FiShare2 className="w-4 h-4" />
                      Share
                    </button>
                  </div>
                </AnimatedSection>

                {/* Blog Content */}
                <AnimatedSection direction="up" delay={0.4}>
                  <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-100 dark:border-gray-700">
                    <div className="prose dark:prose-invert max-w-none">
                      <div className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                        {blog.content}
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <AnimatedSection direction="right" delay={0.5}>
                  {/* Blog Statistics */}
                  <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-100 dark:border-gray-700 mb-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                      <FiBookOpen className="w-5 h-5 text-primary-600" />
                      Blog Statistics
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 dark:text-gray-400">Reading Time</span>
                        <span className="font-semibold text-gray-900 dark:text-white">{readingTime} min</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 dark:text-gray-400">Word Count</span>
                        <span className="font-semibold text-gray-900 dark:text-white">{wordCount}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 dark:text-gray-400">Published</span>
                        <span className="font-semibold text-gray-900 dark:text-white">
                          {new Date(blog.createdAt).toLocaleDateString(undefined, {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Tags */}
                  {blog.tags && blog.tags.length > 0 && (
                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-100 dark:border-gray-700 mb-6">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                        <FiTag className="w-5 h-5 text-primary-600" />
                        Tags
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {blog.tags.map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-sm">
                            #{tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Author Info */}
                  <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-100 dark:border-gray-700 mb-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                      <FiUser className="w-5 h-5 text-primary-600" />
                      Author
                    </h3>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/20 rounded-full flex items-center justify-center">
                        <FiUser className="w-6 h-6 text-primary-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">{blog.author}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Web Developer</p>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              </div>
            </div>

            {/* CTA Section */}
            <AnimatedSection direction="up" delay={0.8}>
              <div className="mt-16 text-center">
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-100 dark:border-gray-700">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    Want to Read More?
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
                    Explore our collection of web development insights, tips, and industry trends.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                      href="/blogs"
                      className="inline-flex items-center gap-2 px-8 py-4 bg-primary-600 text-white rounded-full hover:bg-primary-700 transition-all duration-300 hover:scale-105 shadow-lg font-semibold"
                    >
                      Browse All Blogs
                      <FiArrowLeft className="w-4 h-4 rotate-180" />
                    </Link>
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 px-8 py-4 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300 font-semibold"
                    >
                      Get in Touch
                    </Link>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default BlogDetails; 
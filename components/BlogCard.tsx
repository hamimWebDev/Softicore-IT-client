import Image from "next/image";
import Link from "next/link";
import React from "react";
import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";

export interface IBlog {
  _id: string;
  title: string;
  content: string;
  author: string;
  tags: string[];
  coverImage: string;
  createdAt: Date;
  updatedAt: Date;
}

const BlogCard = ({ blog }: { blog: IBlog }) => {
  return (
    <Tilt
      className="parallax-effect "
      perspective={500}
      glareEnable={true}
      glareMaxOpacity={0.45}
      scale={1.02}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        whileHover={{ scale: 1.04, boxShadow: "0 8px 32px rgba(0,0,0,0.15)" }}
      >
        <div
          className="bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col overflow-hidden group"
          style={{ minHeight: 420 }}
        >
          {/* Author Name */}
          <div className="flex items-center gap-2 p-4 border-b border-gray-100 dark:border-gray-700 bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm">
            <span className="text-base font-semibold text-gray-700 dark:text-gray-200 tracking-wide">
              {blog.author}
            </span>
          </div>

          {/* Animated Image */}
          <div className="relative w-full h-[200px] overflow-hidden">
            <motion.div
              whileHover={{ scale: 1.08 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              style={{ width: "100%", height: "100%" }}
            >
              <Image
                alt={`${blog.author}'s cover image`}
                src={blog.coverImage || "/default-avatar.png"}
                fill
                sizes="(max-width: 768px) 100vw, 400px"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                priority
              />
            </motion.div>
          </div>

          {/* Blog Title and Description */}
          <div className="p-6 flex flex-col flex-grow gap-2">
            <h3 className="mb-1 text-2xl font-extrabold text-gray-900 dark:text-white leading-tight group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors duration-300">
              {blog.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-base line-clamp-2 font-medium">
              {blog.content}
            </p>
            <div className="flex flex-wrap gap-2 mt-2">
              {blog.tags?.map((tag) => (
                <span key={tag} className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200 px-2 py-0.5 rounded text-xs font-semibold">
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* View Details Button */}
          <div className="p-4 mt-auto">
            {blog._id ? (
              <Link
                href={`/blog/${blog._id}`}
                className="inline-flex items-center px-5 py-2.5 text-base font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow hover:from-blue-700 hover:to-purple-700 focus:ring-4 focus:outline-none focus:ring-blue-300 transition-all duration-300 group-hover:-translate-y-1"
              >
                View Details
                <svg
                  aria-hidden="true"
                  className="w-4 h-4 ml-2"
                  fill="none"
                  viewBox="0 0 14 10"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  />
                </svg>
              </Link>
            ) : (
              <button
                className="inline-flex items-center px-5 py-2.5 text-base font-semibold text-white bg-gray-400 rounded-lg shadow cursor-not-allowed opacity-60"
                disabled
                title="No details available"
              >
                View Details
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </Tilt>
  );
};

export default BlogCard; 
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";
import { FaUser, FaRegCalendarAlt } from "react-icons/fa";

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
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden flex flex-col transition-transform duration-300 hover:scale-[1.03] hover:shadow-3xl max-w-lg w-full">
      {/* Image */}
      <div className="relative w-full h-[260px]">
        <Image
          alt={`${blog.author}'s cover image`}
          src={blog.coverImage || "/default-avatar.png"}
          fill
          className="object-cover w-full h-full"
          priority
        />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-grow p-8">
        {/* Title */}
        <h3 className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white mb-4 line-clamp-2">
          {blog.title}
        </h3>
        {/* Meta Info */}
        <div className="flex items-center text-gray-500 dark:text-gray-400 text-lg mb-4 gap-6">
          <span className="flex items-center gap-2">
            <FaUser className="text-xl" />
            {blog.author}
          </span>
          <span className="flex items-center gap-2">
            <FaRegCalendarAlt className="text-xl" />
            {new Date(blog.createdAt).toLocaleDateString("en-US", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </span>
        </div>
        {/* Description */}
        <p className="text-gray-600 dark:text-gray-300 text-lg line-clamp-2 mb-6">
          {blog.content}
        </p>
        {/* Read More Button */}
        <div className="mt-auto">
          <Link
            href={`/blog/${blog._id}`}
            className="inline-block px-7 py-3 text-lg font-bold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow hover:from-blue-700 hover:to-purple-700 focus:ring-4 focus:outline-none focus:ring-blue-300 transition-all duration-300"
          >
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogCard; 
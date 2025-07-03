"use client"

import { useState } from "react";
import AnimatedSection from "@/components/AnimatedSection";
import BlogCard from "@/components/BlogCard";
import { useGetAllblogsQuery } from "@/redux/features/Blogs/blogsApi";
import Head from "next/head";

const Blogs = () => {
  // Fetch blogs using the existing RTK Query hook
  const { data, isLoading } = useGetAllblogsQuery(undefined) as any;
  const [visibleCount, setVisibleCount] = useState(6);

  // Get the blogs to show based on the current visibleCount
  const blogsToShow = data?.slice(0, visibleCount);

  // Check if there are more blogs to load
  const hasMoreBlogs = data?.length > visibleCount;

  // Function to handle showing more blogs
  const handleShowMore = () => {
    setVisibleCount((prevCount) => prevCount + 3);
  };

  return (

    <div>
      <Head>
        <title>Blogs</title>
        <meta
          name="description"
          content="This is  Md. Hamim Howlader Asif's Portfolio Contact page"
        />
      </Head>
      <div className="container-custom h-full mb-10" id="blog">
        <div className="my-5 pt-32 pb-5 flex justify-center items-center">
          <AnimatedSection className="text-4xl md:text-5xl font-bold mb-6 text-center">
            My Latest Blogs
          </AnimatedSection>
        </div>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogsToShow?.map((blog: any, index: number) => (
                <BlogCard key={`${blog?.id || blog?._id || index}`} blog={blog} />
              ))}
            </div>
            {hasMoreBlogs && (
              <div className="flex justify-center mt-10">
                <button onClick={handleShowMore} className="btn btn-accent px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-medium rounded-full hover:scale-105 transition-all duration-300">
                  Load More
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Blogs;

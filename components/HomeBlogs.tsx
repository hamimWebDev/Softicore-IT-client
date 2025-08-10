"use client"

import { useState } from "react";
import AnimatedSection from "@/components/AnimatedSection";
import BlogCard from "@/components/BlogCard";
import { useGetAllblogsQuery } from "@/redux/features/Blogs/blogsApi";

const HomeBlogs = () => {
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
    <section className="py-8 bg-gradient-to-r from-blue-100 via-purple-50 to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container-custom h-full " id="blog">
        <AnimatedSection className="text-center mb-16">
          <div className="lg:py-10 mb-11 lg:mt-1 ">
            <div className="text-center">
              <h3 className="text-4xl text-primary-500 mb-2 ">
                &lt; Blogs /&gt;
              </h3>
              <h1 className="text-3xl md:text-4xl font-extrabold leading-tight mb-2">
                See our Latest & Popular Tips & Tricks<br />
                from our Experts
              </h1>
            </div>
          </div>
        </AnimatedSection>
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
    </section>
  );
};

export default HomeBlogs;

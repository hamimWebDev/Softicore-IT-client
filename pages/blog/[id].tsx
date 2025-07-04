import { useRouter } from "next/router";
import { useGetBlogByIdQuery } from "@/redux/features/Blogs/blogsApi";
import Head from "next/head";
import Image from "next/image";
import { motion } from "framer-motion";

interface Blog {
  title: string;
  content: string;
  author: string;
  createdAt: string;
  coverImage?: string;
  tags?: string[];
}

const BlogDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data: blog, isLoading, isError } = useGetBlogByIdQuery(id, { skip: !id }) as { data: Blog | undefined, isLoading: boolean, isError: boolean };

  if (isLoading) return <div className="pt-32 text-center animate-pulse text-lg font-semibold">Loading...</div>;
  if (isError || !blog) return <div className="pt-32 text-center text-red-500 font-semibold">Blog not found.</div>;

  return (
    <>
      <Head>
        <title>{blog.title}</title>
        <meta name="description" content={blog.content?.slice(0, 150)} />
      </Head>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="pt-32 pb-16 px-2 sm:px-4 flex justify-center min-h-screen bg-gradient-to-r from-blue-100 via-purple-50 to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"
      >
        <div className="w-full max-w-3xl bg-white/90 dark:bg-gray-900/80 rounded-2xl shadow-xl p-6 sm:p-10 border border-gray-100 dark:border-gray-800">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-3xl sm:text-4xl font-extrabold mb-4 text-gray-900 dark:text-white tracking-tight"
          >
            {blog.title}
          </motion.h1>
          <div className="flex items-center gap-6 mb-6">
            <span className="inline-flex items-center gap-1 text-gray-700 dark:text-gray-300 font-medium text-base">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-1 text-gray-400 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A13.937 13.937 0 0012 20c2.5 0 4.847-.655 6.879-1.804M15 10a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {blog.author}
            </span>
            <span className="inline-flex items-center gap-1 text-gray-500 dark:text-gray-400 text-base">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-1 text-gray-400 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <rect x="3" y="7" width="18" height="13" rx="2" fill="none" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 3v4M8 3v4M3 11h18" />
              </svg>
              {new Date(blog.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: '2-digit' })}
            </span>
          </div>
          <motion.div
            initial={{ scale: 0.97, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.7, type: "spring" }}
            className="relative w-full h-56 sm:h-72 mb-8 rounded-xl overflow-hidden shadow-lg group"
          >
            <Image
              src={blog.coverImage || "/default-avatar.png"}
              alt={blog.title}
              fill
              sizes="(max-width: 768px) 100vw, 700px"
              className="object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="prose dark:prose-invert max-w-none mb-6 text-lg leading-relaxed"
          >
            <p>{blog.content}</p>
          </motion.div>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.08,
                },
              },
            }}
            className="flex flex-wrap gap-2 mt-4"
          >
            {blog.tags?.map((tag: string, i: number) => (
              <motion.span
                key={tag}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + i * 0.08, duration: 0.4, type: "spring" }}
                className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200 px-3 py-1 rounded-full text-xs font-semibold shadow-sm hover:scale-105 transition-transform cursor-pointer"
              >
                #{tag}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </>
  );
};

export default BlogDetails; 
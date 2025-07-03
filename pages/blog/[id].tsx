import { useRouter } from "next/router";
import { useGetBlogByIdQuery } from "@/redux/features/Blogs/blogsApi";
import Head from "next/head";
import Image from "next/image";

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

  if (isLoading) return <div className="pt-32 text-center">Loading...</div>;
  if (isError || !blog) return <div className="pt-32 text-center">Blog not found.</div>;

  return (
    <>
      <Head>
        <title>{blog.title}</title>
        <meta name="description" content={blog.content?.slice(0, 150)} />
      </Head>
      <div className="pt-32 pb-16 max-w-3xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
        <div className="flex items-center gap-4 mb-6">
          <span className="text-gray-600 dark:text-gray-300 font-medium">By {blog.author}</span>
          <span className="text-gray-400 text-sm">{new Date(blog.createdAt).toLocaleDateString()}</span>
        </div>
        <div className="relative w-full h-64 mb-8 rounded-lg overflow-hidden">
          <Image src={blog.coverImage || "/default-avatar.png"} alt={blog.title} fill sizes="(max-width: 768px) 100vw, 700px" className="object-cover" />
        </div>
        <div className="prose dark:prose-invert max-w-none mb-6">
          <p>{blog.content}</p>
        </div>
        <div className="flex flex-wrap gap-2 mt-4">
          {blog.tags?.map((tag: string) => (
            <span key={tag} className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200 px-2 py-0.5 rounded text-xs font-semibold">
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </>
  );
};

export default BlogDetails; 
import { useState } from "react";
import { useRouter } from "next/router";
import AdminDashboardLayout from "@/components/AdminDashboardLayout";
import PrivateRoute from "@/pages/utils/PrivateRoute";
import { useGetAllblogsQuery, useDeleteBlogMutation } from "@/redux/features/Blogs/blogsApi";
import Link from "next/link";

const DashboardBlogs = () => {
  const { data, isLoading } = useGetAllblogsQuery(undefined);
  const [deleteBlog, { isLoading: isDeleting }] = useDeleteBlogMutation();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const router = useRouter();
  const blogs: any[] = Array.isArray(data) ? data : [];

  const handleUpdate = (blog: any) => {
    router.push(`/dashboard/update-blog/${blog._id || blog.id}`);
  };

  const handleDelete = async (blog: any) => {
    const blogId = blog._id || blog.id;
    if (window.confirm(`Are you sure you want to delete "${blog.title}"? This action cannot be undone.`)) {
      try {
        setDeletingId(blogId);
        await deleteBlog(blogId).unwrap();
      } catch (error) {
        console.error('Failed to delete blog:', error);
        alert('Failed to delete blog. Please try again.');
      } finally {
        setDeletingId(null);
      }
    }
  };

  return (
    <AdminDashboardLayout>
      <PrivateRoute allowedRoles={["admin"]}>
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Blogs (Admin)</h1>
          <Link href="/dashboard/create-blog">
            <span className="px-6 py-2 bg-teal-300 text-gray-900 rounded-full font-semibold shadow hover:bg-teal-400 transition cursor-pointer">
              Create blog
            </span>
          </Link>
        </div>
        <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-xl shadow-md">
          <table className="min-w-full text-left">
            <thead className="bg-gray-100 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-4 font-semibold">Cover</th>
                <th className="px-6 py-4 font-semibold">Title</th>
                <th className="px-6 py-4 font-semibold">Author</th>
                <th className="px-6 py-4 font-semibold">Tags</th>
                <th className="px-6 py-4 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr><td colSpan={5} className="px-6 py-8 text-center">Loading...</td></tr>
              ) : blogs.length === 0 ? (
                <tr><td colSpan={5} className="px-6 py-8 text-center">No blogs found.</td></tr>
              ) : (
                blogs.map((blog: any) => {
                  const blogId = blog._id || blog.id;
                  const isThisDeleting = deletingId === blogId;
                  return (
                    <tr key={blogId} className="border-b last:border-b-0">
                      <td className="px-6 py-4">
                        <img src={blog.coverImage} alt={blog.title} className="w-16 h-16 object-cover rounded-lg border" />
                      </td>
                      <td className="px-6 py-4">{blog.title}</td>
                      <td className="px-6 py-4">{blog.author}</td>
                      <td className="px-6 py-4 max-w-xs truncate">{Array.isArray(blog.tags) ? blog.tags.join(", ") : ""}</td>
                      <td className="px-6 py-4 flex gap-2">
                        <button
                          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded font-semibold transition"
                          onClick={() => handleUpdate(blog)}
                        >
                          Update
                        </button>
                        <button
                          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
                          onClick={() => handleDelete(blog)}
                          disabled={isThisDeleting}
                        >
                          {isThisDeleting ? "Deleting..." : "Delete"}
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </PrivateRoute>
    </AdminDashboardLayout>
  );
};

export default DashboardBlogs; 
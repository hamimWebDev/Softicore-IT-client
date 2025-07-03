import React, { useState } from "react";
import AdminDashboardLayout from "@/components/AdminDashboardLayout";
import PrivateRoute from "@/pages/utils/PrivateRoute";
import { useCreateBlogMutation } from "@/redux/features/Blogs/blogsApi";

const CreateBlogPage = () => {
  const [addBlog, { isLoading, error }] = useCreateBlogMutation();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [tags, setTags] = useState("");
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!coverImage) return;
    const formData = new FormData();
    formData.append("file", coverImage);
    const data = {
      title,
      content,
      author,
      tags: tags.split(",").map((tag) => tag.trim()).filter(Boolean),
    };
    formData.append("data", JSON.stringify(data));
    try {
      await addBlog(formData).unwrap();
      setSuccess(true);
      setTitle("");
      setContent("");
      setAuthor("");
      setTags("");
      setCoverImage(null);
      // Reset file input
      const fileInput = document.getElementById('file-input') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setSuccess(false);
    }
  };

  let errorMessage = '';
  if (error) {
    if (typeof error === 'string') {
      errorMessage = error;
    } else if (typeof error === 'object') {
      try {
        errorMessage = JSON.stringify(error);
      } catch {
        errorMessage = 'Failed to create blog.';
      }
    } else {
      errorMessage = 'Failed to create blog.';
    }
  }

  return (
    <AdminDashboardLayout>
      <PrivateRoute allowedRoles={["admin"]}>
        <div className="max-w-2xl mx-auto mt-10 bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          <h1 className="text-2xl font-bold mb-6">Create Blog</h1>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200">Title *</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200">Author *</label>
                <input
                  type="text"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  required
                  className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200">Cover Image *</label>
                <input
                  id="file-input"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setCoverImage(e.target.files[0]);
                    }
                  }}
                  required
                  className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 dark:file:bg-gray-600 dark:file:text-gray-200"
                />
                {coverImage && (
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Selected: {coverImage.name}</p>
                )}
              </div>
              <div className="md:col-span-2">
                <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200">Tags (comma separated)</label>
                <input
                  type="text"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  placeholder="e.g. tech, react, javascript"
                  className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200">Content *</label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                  rows={6}
                  className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[80px] resize-vertical"
                />
              </div>
            </div>
            <button
              type="submit"
              className="mt-6 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition w-full"
              disabled={isLoading}
            >
              {isLoading ? "Creating..." : "Create Blog"}
            </button>
            {Boolean(error) && (
              <div className="mt-4 text-red-600 font-semibold text-center">
                {errorMessage || "Error creating blog. Please try again."}
              </div>
            )}
            {success && (
              <div className="mt-4 text-green-600 font-semibold text-center">Blog created successfully!</div>
            )}
          </form>
        </div>
      </PrivateRoute>
    </AdminDashboardLayout>
  );
};

export default CreateBlogPage; 
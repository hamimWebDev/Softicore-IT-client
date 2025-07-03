import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import AdminDashboardLayout from "@/components/AdminDashboardLayout";
import PrivateRoute from "@/pages/utils/PrivateRoute";
import { useUpdateProductMutation, useGetProductByIdQuery } from "@/redux/features/products/productsApi";
import { ICreateWorkForm, ICreateWorkRequest } from "@/types/work.types";

const UpdateWorkPage = () => {
  const [updateWork, { isLoading, error }] = useUpdateProductMutation();
  const router = useRouter();
  const { id } = router.query;

  const [form, setForm] = useState<ICreateWorkForm>({
    title: "",
    description: "",
    category: "",
    technologies: "",
    liveLink: "",
    frontend: "",
    backend: "",
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [existingImage, setExistingImage] = useState<string>("");

  // Fetch existing work data using the API
  const { data: workData, isLoading: isLoadingWork } = useGetProductByIdQuery(id as string, {
    skip: !id,
  });

  // Update form when work data is loaded
  useEffect(() => {
    if (workData) {
      const data = workData as import("@/types/work.types").IWork;
      setForm({
        title: data.title || "",
        description: data.description || "",
        category: data.category || "",
        technologies: Array.isArray(data.technologies) ? data.technologies.join(', ') : data.technologies || "",
        liveLink: data.liveLink || "",
        frontend: data.frontend || "",
        backend: data.backend || "",
      });
      setExistingImage(data.image || "");
    }
  }, [workData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Create FormData for file upload
      const formData = new FormData();
      
      // Only append file if a new one is selected
      if (selectedFile) {
        formData.append('file', selectedFile);
      }
      
      // Convert technologies string to array if needed
      const productData: ICreateWorkRequest = {
        ...form,
        technologies: form.technologies.split(',').map((tech: string) => tech.trim()).filter((tech: string) => tech)
      };
      
      // Add the JSON data as a string
      formData.append('data', JSON.stringify(productData));
      
      await updateWork({ id: id as string, formData }).unwrap();
      
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
      router.push('/dashboard/work');
    } catch (error) {
      console.error('Failed to update work:', error);
      // You can add error handling here, like showing a toast notification
    }
  };

  if (!id) {
    return (
      <AdminDashboardLayout>
        <PrivateRoute allowedRoles={["admin"]}>
          <div className="max-w-2xl mx-auto mt-10 bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
            <h1 className="text-2xl font-bold mb-6 text-red-600">Error: No work ID provided</h1>
            <p>Please go back to the work list and select a work to update.</p>
          </div>
        </PrivateRoute>
      </AdminDashboardLayout>
    );
  }

  if (isLoadingWork) {
    return (
      <AdminDashboardLayout>
        <PrivateRoute allowedRoles={["admin"]}>
          <div className="max-w-2xl mx-auto mt-10 bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
            <h1 className="text-2xl font-bold mb-6">Loading...</h1>
          </div>
        </PrivateRoute>
      </AdminDashboardLayout>
    );
  }

  return (
    <AdminDashboardLayout>
      <PrivateRoute allowedRoles={["admin"]}>
        <div className="max-w-2xl mx-auto mt-10 bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          <h1 className="text-2xl font-bold mb-6">Update Work</h1>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200">Title</label>
                <input 
                  type="text" 
                  name="title" 
                  value={form.title} 
                  onChange={handleChange} 
                  className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                  required 
                />
              </div>
              <div>
                <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200">Category</label>
                <input 
                  type="text" 
                  name="category" 
                  value={form.category} 
                  onChange={handleChange} 
                  className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                  required 
                />
              </div>
              <div className="md:col-span-2">
                <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200">Image File</label>
                {existingImage && (
                  <div className="mb-2">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Current image:</p>
                    <img src={existingImage} alt="Current" className="w-20 h-20 object-cover rounded border" />
                  </div>
                )}
                <input 
                  id="file-input"
                  type="file" 
                  accept="image/*"
                  onChange={handleFileChange} 
                  className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 dark:file:bg-gray-600 dark:file:text-gray-200" 
                />
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Leave empty to keep current image</p>
                {selectedFile && (
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Selected: {selectedFile.name}</p>
                )}
              </div>
              <div>
                <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200">Live Link</label>
                <input 
                  type="text" 
                  name="liveLink" 
                  value={form.liveLink} 
                  onChange={handleChange} 
                  className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                  required 
                />
              </div>
              <div>
                <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200">Frontend Repo</label>
                <input 
                  type="text" 
                  name="frontend" 
                  value={form.frontend} 
                  onChange={handleChange} 
                  className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                />
              </div>
              <div>
                <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200">Backend Repo</label>
                <input 
                  type="text" 
                  name="backend" 
                  value={form.backend} 
                  onChange={handleChange} 
                  className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                />
              </div>
              <div className="md:col-span-2">
                <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200">Technologies (comma separated)</label>
                <input 
                  type="text" 
                  name="technologies" 
                  value={form.technologies} 
                  onChange={handleChange} 
                  className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                />
              </div>
              <div className="md:col-span-2">
                <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200">Description</label>
                <textarea 
                  name="description" 
                  value={form.description} 
                  onChange={handleChange} 
                  className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[80px] resize-vertical" 
                  required 
                />
              </div>
            </div>
            <div className="flex gap-4 mt-6">
              <button 
                type="button" 
                onClick={() => router.push('/dashboard/work')}
                className="px-6 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition flex-1" 
                disabled={isLoading}
              >
                {isLoading ? "Updating..." : "Update Work"}
              </button>
            </div>
            {!!error && (
              <div className="mt-4 text-red-600 font-semibold text-center">
                Error updating work. Please try again.
              </div>
            )}
            {submitted && (
              <div className="mt-4 text-green-600 font-semibold text-center">Work updated successfully!</div>
            )}
          </form>
        </div>
      </PrivateRoute>
    </AdminDashboardLayout>
  );
};

export default UpdateWorkPage; 
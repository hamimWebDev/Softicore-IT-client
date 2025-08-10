import { useState } from "react";
import { useRouter } from "next/router";
import AdminDashboardLayout from "@/components/AdminDashboardLayout";
import PrivateRoute from "@/pages/utils/PrivateRoute";
import { useGetAllProductsQuery, useDeleteProductMutation } from "@/redux/features/products/productsApi";
import Link from "next/link";

const DashboardWork = () => {
  const { data, isLoading } = useGetAllProductsQuery(undefined);
  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const router = useRouter();
  const works: any[] = Array.isArray(data) ? data : [];

  const handleUpdate = (work: any) => {
    // Navigate to update page with work ID
    router.push(`/dashboard/update-work/${work._id || work.id}`);
  };

  const handleDelete = async (work: any) => {
    const workId = work._id || work.id;
    if (window.confirm(`Are you sure you want to delete "${work.title}"? This action cannot be undone.`)) {
      try {
        setDeletingId(workId);
        await deleteProduct(workId).unwrap();
        // Success message could be shown here
      } catch (error) {
        console.error('Failed to delete work:', error);
        alert('Failed to delete work. Please try again.');
      } finally {
        setDeletingId(null);
      }
    }
  };

  return (
    <AdminDashboardLayout>
      <PrivateRoute allowedRoles={["admin"]}>
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">My Project</h1>
          <Link href="/dashboard/create-work">
            <span className="px-6 py-2 bg-teal-300 text-gray-900 rounded-full font-semibold shadow hover:bg-teal-400 transition cursor-pointer">
              Create works
            </span>
          </Link>
        </div>
        <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-xl shadow-md">
          <table className="min-w-full text-left">
            <thead className="bg-gray-100 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-4 font-semibold">Image</th>
                <th className="px-6 py-4 font-semibold">Title</th>
                <th className="px-6 py-4 font-semibold">Category</th>
                <th className="px-6 py-4 font-semibold">Description</th>
                <th className="px-6 py-4 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr><td colSpan={5} className="px-6 py-8 text-center">Loading...</td></tr>
              ) : works.length === 0 ? (
                <tr><td colSpan={5} className="px-6 py-8 text-center">No works found.</td></tr>
              ) : (
                works.map((work: any) => {
                  const workId = work._id || work.id;
                  const isThisDeleting = deletingId === workId;
                  
                  return (
                    <tr key={work.id} className="border-b last:border-b-0">
                      <td className="px-6 py-4">
                        <img src={work.image} alt={work.title} className="w-16 h-16 object-cover rounded-lg border" />
                      </td>
                      <td className="px-6 py-4">{work.title}</td>
                      <td className="px-6 py-4">{work.category}</td>
                      <td className="px-6 py-4 max-w-xs truncate">{work.description}</td>
                      <td className="px-6 py-4 flex gap-2">
                        <button
                          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded font-semibold transition"
                          onClick={() => handleUpdate(work)}
                        >
                          Update
                        </button>
                        <button
                          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
                          onClick={() => handleDelete(work)}
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

export default DashboardWork; 
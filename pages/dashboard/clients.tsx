import { useState } from "react";
import { useRouter } from "next/router";
import AdminDashboardLayout from "@/components/AdminDashboardLayout";
import PrivateRoute from "@/pages/utils/PrivateRoute";
import { useGetAllClientsQuery, useDeleteClientMutation } from "@/redux/features/client/clientApi";
import Link from "next/link";

const DashboardClients = () => {
  const { data, isLoading } = useGetAllClientsQuery(undefined);
  const [deleteClient, { isLoading: isDeleting }] = useDeleteClientMutation();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const router = useRouter();
  const clients: any[] = Array.isArray(data) ? data : [];

  const handleUpdate = (client: any) => {
    // Navigate to update page with client ID
    router.push(`/dashboard/update-client/${client._id || client.id}`);
  };

  const handleDelete = async (client: any) => {
    const clientId = client._id || client.id;
    if (window.confirm(`Are you sure you want to delete "${client.name}"? This action cannot be undone.`)) {
      try {
        setDeletingId(clientId);
        await deleteClient(clientId).unwrap();
        // Success message could be shown here
      } catch (error) {
        console.error('Failed to delete client:', error);
        alert('Failed to delete client. Please try again.');
      } finally {
        setDeletingId(null);
      }
    }
  };

  return (
    <AdminDashboardLayout>
      <PrivateRoute allowedRoles={["admin"]}>
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Clients</h1>
          <Link href="/dashboard/create-client">
            <span className="px-6 py-2 bg-teal-300 text-gray-900 rounded-full font-semibold shadow hover:bg-teal-400 transition cursor-pointer">
              Add Client
            </span>
          </Link>
        </div>
        <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-xl shadow-md">
          <table className="min-w-full text-left">
            <thead className="bg-gray-100 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-4 font-semibold">Image</th>
                <th className="px-6 py-4 font-semibold">Name</th>
                <th className="px-6 py-4 font-semibold">Website</th>
                <th className="px-6 py-4 font-semibold">WhatsApp</th>
                <th className="px-6 py-4 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr><td colSpan={5} className="px-6 py-8 text-center">Loading...</td></tr>
              ) : clients.length === 0 ? (
                <tr><td colSpan={5} className="px-6 py-8 text-center">No clients found.</td></tr>
              ) : (
                clients.map((client: any) => {
                  const clientId = client._id || client.id;
                  const isThisDeleting = deletingId === clientId;
                  
                  return (
                    <tr key={clientId} className="border-b last:border-b-0">
                      <td className="px-6 py-4">
                        <img 
                          src={client.image} 
                          alt={client.name} 
                          className="w-16 h-16 object-cover rounded-lg border"
                        />
                      </td>
                      <td className="px-6 py-4 font-medium">{client.name}</td>
                      <td className="px-6 py-4">
                        {client.website ? (
                          <a 
                            href={client.website} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                          >
                            Visit Website
                          </a>
                        ) : (
                          <span className="text-gray-500">No website</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {client.whatsapp ? (
                          <a 
                            href={`https://wa.me/${client.whatsapp.replace(/\D/g, '')}`}
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300"
                          >
                            {client.whatsapp}
                          </a>
                        ) : (
                          <span className="text-gray-500">No WhatsApp</span>
                        )}
                      </td>
                      <td className="px-6 py-4 flex gap-2">
                        <button
                          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded font-semibold transition"
                          onClick={() => handleUpdate(client)}
                        >
                          Update
                        </button>
                        <button
                          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
                          onClick={() => handleDelete(client)}
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

export default DashboardClients; 
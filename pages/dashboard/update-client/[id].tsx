import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import AdminDashboardLayout from "@/components/AdminDashboardLayout";
import PrivateRoute from "@/pages/utils/PrivateRoute";
import { useUpdateClientMutation, useGetClientByIdQuery } from "@/redux/features/client/clientApi";

interface IUpdateClientForm {
  name: string;
  whatsapp: string;
  website: string;
}

const UpdateClientPage = () => {
  const [updateClient, { isLoading, error }] = useUpdateClientMutation();
  const router = useRouter();
  const { id } = router.query;

  const [form, setForm] = useState<IUpdateClientForm>({
    name: "",
    whatsapp: "",
    website: "",
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [existingImage, setExistingImage] = useState<string>("");

  // Fetch existing client data using the API
  const { data: clientData, isLoading: isLoadingClient } = useGetClientByIdQuery(id as string, {
    skip: !id,
  });

  // Update form when client data is loaded
  useEffect(() => {
    if (clientData) {
      const data = clientData as any;
      setForm({
        name: data.name || "",
        whatsapp: data.whatsapp || "",
        website: data.website || "",
      });
      setExistingImage(data.image || "");
    }
  }, [clientData]);

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
      
      // Add the JSON data as a string
      formData.append('data', JSON.stringify(form));
      
      await updateClient({ id: id as string, formData }).unwrap();
      
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
      router.push('/dashboard/clients');
    } catch (error) {
      console.error('Failed to update client:', error);
      // You can add error handling here, like showing a toast notification
    }
  };

  if (!id) {
    return (
      <AdminDashboardLayout>
        <PrivateRoute allowedRoles={["admin"]}>
          <div className="max-w-2xl mx-auto mt-10 bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
            <h1 className="text-2xl font-bold mb-6 text-red-600">Error: No client ID provided</h1>
            <p>Please go back to the clients list and select a client to update.</p>
          </div>
        </PrivateRoute>
      </AdminDashboardLayout>
    );
  }

  if (isLoadingClient) {
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
          <h1 className="text-2xl font-bold mb-6">Update Client</h1>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200">Client Name</label>
                <input 
                  type="text" 
                  name="name" 
                  value={form.name} 
                  onChange={handleChange} 
                  className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                  required 
                />
              </div>
              <div>
                <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200">Website URL</label>
                <input 
                  type="url" 
                  name="website" 
                  value={form.website} 
                  onChange={handleChange} 
                  className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                  placeholder="https://example.com"
                  required 
                />
              </div>
              <div>
                <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200">WhatsApp Number</label>
                <input 
                  type="tel" 
                  name="whatsapp" 
                  value={form.whatsapp} 
                  onChange={handleChange} 
                  className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                  placeholder="+1234567890"
                  required 
                />
              </div>
              <div className="md:col-span-2">
                <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200">Client Logo/Image</label>
                {existingImage && (
                  <div className="mb-3">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Current Image:</p>
                    <img 
                      src={existingImage} 
                      alt="Current client image" 
                      className="w-20 h-20 object-cover rounded-lg border"
                      onError={(e) => {
                        e.currentTarget.src = "/icon/profile_image.jpg";
                      }}
                    />
                  </div>
                )}
                <input 
                  id="file-input"
                  type="file" 
                  accept="image/*"
                  onChange={handleFileChange} 
                  className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 dark:file:bg-gray-600 dark:file:text-gray-200" 
                />
                {selectedFile && (
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Selected: {selectedFile.name}</p>
                )}
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Leave empty to keep the current image
                </p>
              </div>
            </div>
            <button type="submit" className="mt-6 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition w-full" disabled={isLoading}>
              {isLoading ? "Updating..." : "Update Client"}
            </button>
            {!!error && (
              <div className="mt-4 text-red-600 font-semibold text-center">
                Error updating client. Please try again.
              </div>
            )}
            {submitted && (
              <div className="mt-4 text-green-600 font-semibold text-center">Client updated successfully!</div>
            )}
          </form>
        </div>
      </PrivateRoute>
    </AdminDashboardLayout>
  );
};

export default UpdateClientPage; 
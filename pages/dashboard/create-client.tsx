import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import AdminDashboardLayout from "@/components/AdminDashboardLayout";
import PrivateRoute from "@/pages/utils/PrivateRoute";
import { useCreateClientMutation } from "@/redux/features/client/clientApi";

interface ICreateClientForm {
  name: string;
  whatsapp: string;
  website: string;
}

const CreateClientPage = () => {
  const [addClient, { isLoading, error }] = useCreateClientMutation();
  const router = useRouter();

  const [form, setForm] = useState<ICreateClientForm>({
    name: "",
    whatsapp: "",
    website: "",
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [formKey, setFormKey] = useState(0); // Add key for form reset

  const resetForm = () => {
    setForm({
      name: "",
      whatsapp: "",
      website: "",
    });
    setSelectedFile(null);
    setFormKey(prev => prev + 1); // Force form re-render
    
    // Reset file input
    const fileInput = document.getElementById('file-input') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  };

  // Reset form when component mounts
  useEffect(() => {
    resetForm();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    } else {
      setSelectedFile(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedFile) {
      alert('Please select an image file');
      return;
    }
    
    // Validate file type
    if (!selectedFile.type.startsWith('image/')) {
      alert('Please select a valid image file');
      return;
    }
    
    // Validate file size (max 5MB)
    if (selectedFile.size > 5 * 1024 * 1024) {
      alert('Image file size must be less than 5MB');
      return;
    }
    
    try {
      // Create FormData for file upload
      const formData = new FormData();
      formData.append('file', selectedFile);
      
      // Add the JSON data as a string with a placeholder image field
      const formDataWithImage = {
        ...form,
        image: 'placeholder' // This will be replaced by the backend with the actual file path
      };
      formData.append('data', JSON.stringify(formDataWithImage));
      
      // Debug: Log the FormData contents
      console.log('FormData contents:');
      Array.from(formData.entries()).forEach(([key, value]) => {
        if (value instanceof File) {
          console.log(key, 'File:', value.name, value.type, value.size);
        } else {
          console.log(key, value);
        }
      });
      console.log('Form data being sent:', formDataWithImage);
      console.log('Selected file:', selectedFile.name, selectedFile.type, selectedFile.size);
      
      const result = await addClient(formData).unwrap();
      console.log('Client creation result:', result);
      
      setSubmitted(true);
      resetForm();
      
      setTimeout(() => {
        setSubmitted(false);
        router.push('clients');
      }, 2000);
    } catch (error) {
      console.error('Failed to create client:', error);
      // Show more detailed error information
      if (error && typeof error === 'object' && 'data' in error) {
        console.error('Error data:', (error as any).data);
        alert(`Failed to create client: ${(error as any).data?.message || 'Unknown error'}`);
      } else {
        alert('Failed to create client. Please try again.');
      }
    }
  };

  return (
    <AdminDashboardLayout>
      <PrivateRoute allowedRoles={["admin"]}>
        <div className="max-w-2xl mx-auto mt-10 bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          <h1 className="text-2xl font-bold mb-6">Add Client</h1>
          <form key={formKey} onSubmit={handleSubmit}>
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
                <input 
                  id="file-input"
                  type="file" 
                  accept="image/*"
                  onChange={handleFileChange} 
                  className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 dark:file:bg-gray-600 dark:file:text-gray-200" 
                  required 
                />
                {selectedFile && (
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Selected: {selectedFile.name}</p>
                )}
              </div>
            </div>
            <button type="submit" className="mt-6 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition w-full" disabled={isLoading}>
              {isLoading ? "Creating..." : "Add Client"}
            </button>
            {!!error && (
              <div className="mt-4 text-red-600 font-semibold text-center">
                Error creating client. Please try again.
              </div>
            )}
            {submitted && (
              <div className="mt-4 text-green-600 font-semibold text-center">Client added successfully!</div>
            )}
          </form>
        </div>
      </PrivateRoute>
    </AdminDashboardLayout>
  );
};

export default CreateClientPage; 
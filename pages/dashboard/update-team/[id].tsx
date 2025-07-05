import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import AdminDashboardLayout from "@/components/AdminDashboardLayout";
import PrivateRoute from "@/pages/utils/PrivateRoute";
import { useUpdateTeamMemberMutation, useGetTeamMemberByIdQuery } from "@/redux/features/team/teamApi";

interface IUpdateTeamForm {
  name: string;
  email: string;
  phone: string;
  position: string;
  facebook: string;
  linkedin: string;
  github: string;
}

const UpdateTeamPage = () => {
  const [updateTeamMember, { isLoading, error }] = useUpdateTeamMemberMutation();
  const router = useRouter();
  const { id } = router.query;

  const [form, setForm] = useState<IUpdateTeamForm>({
    name: "",
    email: "",
    phone: "",
    position: "",
    facebook: "",
    linkedin: "",
    github: "",
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [existingImage, setExistingImage] = useState<string>("");

  // Fetch existing team member data using the API
  const { data: memberData, isLoading: isLoadingMember } = useGetTeamMemberByIdQuery(id as string, {
    skip: !id,
  });

  // Update form when member data is loaded
  useEffect(() => {
    if (memberData) {
      const data = memberData as any;
      setForm({
        name: data.name || "",
        email: data.email || "",
        phone: data.phone || "",
        position: data.position || "",
        facebook: data.facebook || "",
        linkedin: data.linkedin || "",
        github: data.github || "",
      });
      setExistingImage(data.image || "");
    }
  }, [memberData]);

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
      
      await updateTeamMember({ id: id as string, formData }).unwrap();
      
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
      router.push('/dashboard/team');
    } catch (error) {
      console.error('Failed to update team member:', error);
      // You can add error handling here, like showing a toast notification
    }
  };

  if (!id) {
    return (
      <AdminDashboardLayout>
        <PrivateRoute allowedRoles={["admin"]}>
          <div className="max-w-2xl mx-auto mt-10 bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
            <h1 className="text-2xl font-bold mb-6 text-red-600">Error: No team member ID provided</h1>
            <p>Please go back to the team list and select a member to update.</p>
          </div>
        </PrivateRoute>
      </AdminDashboardLayout>
    );
  }

  if (isLoadingMember) {
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
          <h1 className="text-2xl font-bold mb-6">Update Team Member</h1>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200">Name</label>
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
                <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200">Position</label>
                <input 
                  type="text" 
                  name="position" 
                  value={form.position} 
                  onChange={handleChange} 
                  className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                  required 
                />
              </div>
              <div>
                <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200">Email</label>
                <input 
                  type="email" 
                  name="email" 
                  value={form.email} 
                  onChange={handleChange} 
                  className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                  required 
                />
              </div>
              <div>
                <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200">Phone</label>
                <input 
                  type="tel" 
                  name="phone" 
                  value={form.phone} 
                  onChange={handleChange} 
                  className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                  required 
                />
              </div>
              <div>
                <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200">Facebook URL</label>
                <input 
                  type="url" 
                  name="facebook" 
                  value={form.facebook} 
                  onChange={handleChange} 
                  className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                  required 
                />
              </div>
              <div>
                <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200">LinkedIn URL</label>
                <input 
                  type="url" 
                  name="linkedin" 
                  value={form.linkedin} 
                  onChange={handleChange} 
                  className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                  required 
                />
              </div>
              <div>
                <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200">GitHub URL</label>
                <input 
                  type="url" 
                  name="github" 
                  value={form.github} 
                  onChange={handleChange} 
                  className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                  required 
                />
              </div>
              <div className="md:col-span-2">
                <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200">Profile Image</label>
                {existingImage && (
                  <div className="mb-2">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Current image:</p>
                    <img 
                      src={existingImage} 
                      alt="Current" 
                      className="w-20 h-20 object-cover rounded border"
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
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Leave empty to keep current image</p>
                {selectedFile && (
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Selected: {selectedFile.name}</p>
                )}
              </div>
            </div>
            <div className="flex gap-4 mt-6">
              <button 
                type="button" 
                onClick={() => router.push('/dashboard/team')}
                className="px-6 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition flex-1" 
                disabled={isLoading}
              >
                {isLoading ? "Updating..." : "Update Team Member"}
              </button>
            </div>
            {!!error && (
              <div className="mt-4 text-red-600 font-semibold text-center">
                Error updating team member. Please try again.
              </div>
            )}
            {submitted && (
              <div className="mt-4 text-green-600 font-semibold text-center">Team member updated successfully!</div>
            )}
          </form>
        </div>
      </PrivateRoute>
    </AdminDashboardLayout>
  );
};

export default UpdateTeamPage; 
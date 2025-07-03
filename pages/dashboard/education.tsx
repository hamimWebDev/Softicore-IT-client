import AdminDashboardLayout from "@/components/AdminDashboardLayout";
import { useGetAllJourneysQuery, useAddEducationMutation, useDeleteJourneyMutation, useUpdateJourneyMutation } from "@/redux/features/Journey/journeyApi";
import PrivateRoute from "@/pages/utils/PrivateRoute";
import { useState } from "react";
import { toast } from "sonner";

const DashboardEducation = () => {
  const { data = [], isLoading } = useGetAllJourneysQuery(undefined) as { data: any[]; isLoading: boolean };
  const [addEducation, { isLoading: isAdding }] = useAddEducationMutation();
  const [deleteJourney] = useDeleteJourneyMutation();
  const [updateJourney, { isLoading: isUpdating }] = useUpdateJourneyMutation();
  const [institution, setInstitution] = useState("");
  const [qualification, setQualification] = useState("");
  const [duration, setDuration] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [editId, setEditId] = useState<string | null>(null);
  const [editInstitution, setEditInstitution] = useState("");
  const [editQualification, setEditQualification] = useState("");
  const [editDuration, setEditDuration] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editFile, setEditFile] = useState<File | null>(null);

  const handleAddEducation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!institution || !qualification || !duration || !description || !file) {
      setError("All fields and image are required.");
      return;
    }
    setError("");
    const formData = new FormData();
    formData.append("file", file);
    formData.append("data", JSON.stringify({ institution, qualification, duration, description, type: "education" }));
    let toastId: string | number = toast.loading("Adding education...");
    try {
      await addEducation(formData).unwrap();
      toast.success("Education added successfully!", { id: toastId });
      setInstitution("");
      setQualification("");
      setDuration("");
      setDescription("");
      setFile(null);
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to add education", { id: toastId });
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this education entry?")) return;
    let toastId: string | number = toast.loading("Deleting education...");
    try {
      await deleteJourney(id).unwrap();
      toast.success("Education deleted successfully!", { id: toastId });
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to delete education", { id: toastId });
    }
  };

  const handleEdit = (edu: any) => {
    setEditId(edu._id);
    setEditInstitution(edu.institution);
    setEditQualification(edu.qualification);
    setEditDuration(edu.duration);
    setEditDescription(edu.description);
    setEditFile(null);
  };

  const handleUpdateEducation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editInstitution || !editQualification || !editDuration || !editDescription) {
      toast.error("All fields are required.");
      return;
    }
    const formData = new FormData();
    if (editFile) formData.append("file", editFile);
    formData.append("data", JSON.stringify({ institution: editInstitution, qualification: editQualification, duration: editDuration, description: editDescription, type: "education" }));
    let toastId: string | number = toast.loading("Updating education...");
    try {
      await updateJourney({ id: editId, formData }).unwrap();
      toast.success("Education updated successfully!", { id: toastId });
      setEditId(null);
      setEditInstitution("");
      setEditQualification("");
      setEditDuration("");
      setEditDescription("");
      setEditFile(null);
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to update education", { id: toastId });
    }
  };

  const handleCancelEdit = () => {
    setEditId(null);
    setEditInstitution("");
    setEditQualification("");
    setEditDuration("");
    setEditDescription("");
    setEditFile(null);
  };

  const educations = data.filter((item: any) => item.type === "education");

  return (
    <AdminDashboardLayout>
      <PrivateRoute allowedRoles={["admin"]}>
        <h1 className="text-2xl font-bold mb-4">Education (Admin)</h1>
        <form onSubmit={handleAddEducation} className="mb-6 w-full max-w-2xl mx-auto flex flex-col gap-4 sm:grid sm:grid-cols-2 md:grid-cols-4 items-center">
          <input
            type="text"
            placeholder="Institution"
            value={institution}
            onChange={e => setInstitution(e.target.value)}
            className="border px-3 py-2 rounded bg-white text-gray-900 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />
          <input
            type="text"
            placeholder="Qualification"
            value={qualification}
            onChange={e => setQualification(e.target.value)}
            className="border px-3 py-2 rounded bg-white text-gray-900 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />
          <input
            type="text"
            placeholder="Duration"
            value={duration}
            onChange={e => setDuration(e.target.value)}
            className="border px-3 py-2 rounded bg-white text-gray-900 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />
          <input
            type="file"
            accept="image/*"
            onChange={e => setFile(e.target.files?.[0] || null)}
            className="border px-3 py-2 rounded bg-white text-gray-900 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={e => setDescription(e.target.value)}
            className="border px-3 py-2 rounded bg-white text-gray-900 w-full min-h-[44px] resize-y focus:outline-none focus:ring-2 focus:ring-blue-400 transition md:col-span-2"
            rows={2}
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded w-full col-span-full md:col-span-1 hover:bg-blue-700 transition"
            disabled={isAdding}
          >
            {isAdding ? "Adding..." : "Add Education"}
          </button>
        </form>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        {isLoading ? (
          <div>Loading education entries...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {educations.map((edu: any) => (
              <div key={edu._id} className="flex flex-col items-center border rounded p-4 bg-white dark:bg-gray-800">
                <img src={edu.logoUrl} alt={edu.institution} className="w-16 h-16 object-contain mb-2" />
                <div className="font-semibold mb-2">{edu.institution}</div>
                <div className="text-gray-500 text-sm mb-2">{edu.qualification}</div>
                <div className="text-gray-500 text-sm mb-2">{edu.duration}</div>
                <div className="text-gray-500 text-xs mb-2 text-center">{edu.description}</div>
                {editId === edu._id ? (
                  <form onSubmit={handleUpdateEducation} className="w-full flex flex-col gap-2 mt-2">
                    <input
                      type="text"
                      value={editInstitution}
                      onChange={e => setEditInstitution(e.target.value)}
                      className="border px-2 py-1 rounded bg-white text-gray-900 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                      placeholder="Institution"
                    />
                    <input
                      type="text"
                      value={editQualification}
                      onChange={e => setEditQualification(e.target.value)}
                      className="border px-2 py-1 rounded bg-white text-gray-900 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                      placeholder="Qualification"
                    />
                    <input
                      type="text"
                      value={editDuration}
                      onChange={e => setEditDuration(e.target.value)}
                      className="border px-2 py-1 rounded bg-white text-gray-900 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                      placeholder="Duration"
                    />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={e => setEditFile(e.target.files?.[0] || null)}
                      className="border px-2 py-1 rounded bg-white text-gray-900 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                    />
                    <textarea
                      value={editDescription}
                      onChange={e => setEditDescription(e.target.value)}
                      className="border px-2 py-1 rounded bg-white text-gray-900 w-full min-h-[36px] resize-y focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                      placeholder="Description"
                      rows={2}
                    />
                    <div className="flex gap-2 mt-2">
                      <button
                        type="submit"
                        className="bg-green-600 text-white px-3 py-1 rounded w-full hover:bg-green-700 transition"
                        disabled={isUpdating}
                      >
                        {isUpdating ? "Updating..." : "Update"}
                      </button>
                      <button
                        type="button"
                        className="bg-gray-400 text-white px-3 py-1 rounded w-full hover:bg-gray-500 transition"
                        onClick={handleCancelEdit}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => handleEdit(edu)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(edu._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </PrivateRoute>
    </AdminDashboardLayout>
  );
};

export default DashboardEducation; 
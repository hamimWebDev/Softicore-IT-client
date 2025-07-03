import AdminDashboardLayout from "@/components/AdminDashboardLayout";
import { useGetAllJourneysQuery, useAddExperienceMutation, useDeleteJourneyMutation, useUpdateJourneyMutation } from "@/redux/features/Journey/journeyApi";
import PrivateRoute from "@/pages/utils/PrivateRoute";
import { useState } from "react";
import { toast } from "sonner";

const DashboardWorkExperience = () => {
  const { data = [], isLoading } = useGetAllJourneysQuery(undefined) as { data: any[]; isLoading: boolean };
  const [addExperience, { isLoading: isAdding }] = useAddExperienceMutation();
  const [deleteJourney] = useDeleteJourneyMutation();
  const [updateJourney, { isLoading: isUpdating }] = useUpdateJourneyMutation();
  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");
  const [duration, setDuration] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [editId, setEditId] = useState<string | null>(null);
  const [editCompany, setEditCompany] = useState("");
  const [editPosition, setEditPosition] = useState("");
  const [editDuration, setEditDuration] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editFile, setEditFile] = useState<File | null>(null);

  const handleAddExperience = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!company || !position || !duration || !description || !file) {
      setError("All fields and image are required.");
      return;
    }
    setError("");
    const formData = new FormData();
    formData.append("file", file);
    formData.append("data", JSON.stringify({ company, position, duration, description, type: "experience" }));
    let toastId: string | number = toast.loading("Adding work experience...");
    try {
      await addExperience(formData).unwrap();
      toast.success("Work experience added successfully!", { id: toastId });
      setCompany("");
      setPosition("");
      setDuration("");
      setDescription("");
      setFile(null);
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to add work experience", { id: toastId });
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this work experience entry?")) return;
    let toastId: string | number = toast.loading("Deleting work experience...");
    try {
      await deleteJourney(id).unwrap();
      toast.success("Work experience deleted successfully!", { id: toastId });
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to delete work experience", { id: toastId });
    }
  };

  const handleEdit = (exp: any) => {
    setEditId(exp._id);
    setEditCompany(exp.company);
    setEditPosition(exp.position);
    setEditDuration(exp.duration);
    setEditDescription(exp.description);
    setEditFile(null);
  };

  const handleUpdateExperience = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editCompany || !editPosition || !editDuration || !editDescription) {
      toast.error("All fields are required.");
      return;
    }
    const formData = new FormData();
    if (editFile) formData.append("file", editFile);
    formData.append("data", JSON.stringify({ company: editCompany, position: editPosition, duration: editDuration, description: editDescription, type: "experience" }));
    let toastId: string | number = toast.loading("Updating work experience...");
    try {
      await updateJourney({ id: editId, formData }).unwrap();
      toast.success("Work experience updated successfully!", { id: toastId });
      setEditId(null);
      setEditCompany("");
      setEditPosition("");
      setEditDuration("");
      setEditDescription("");
      setEditFile(null);
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to update work experience", { id: toastId });
    }
  };

  const handleCancelEdit = () => {
    setEditId(null);
    setEditCompany("");
    setEditPosition("");
    setEditDuration("");
    setEditDescription("");
    setEditFile(null);
  };

  const experiences = data.filter((item: any) => item.type === "experience");

  return (
    <AdminDashboardLayout>
      <PrivateRoute allowedRoles={["admin"]}>
        <h1 className="text-2xl font-bold mb-4">Work Experience (Admin)</h1>
        <form onSubmit={handleAddExperience} className="mb-6 w-full max-w-2xl mx-auto flex flex-col gap-4 sm:grid sm:grid-cols-2 md:grid-cols-4 items-center">
          <input
            type="text"
            placeholder="Company"
            value={company}
            onChange={e => setCompany(e.target.value)}
            className="border px-3 py-2 rounded bg-white text-gray-900 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />
          <input
            type="text"
            placeholder="Position"
            value={position}
            onChange={e => setPosition(e.target.value)}
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
            {isAdding ? "Adding..." : "Add Experience"}
          </button>
        </form>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        {isLoading ? (
          <div>Loading work experience entries...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {experiences.map((exp: any) => (
              <div key={exp._id} className="flex flex-col items-center border rounded p-4 bg-white dark:bg-gray-800">
                <img src={exp.logoUrl} alt={exp.company} className="w-16 h-16 object-contain mb-2" />
                <div className="font-semibold mb-2">{exp.company}</div>
                <div className="text-gray-500 text-sm mb-2">{exp.position}</div>
                <div className="text-gray-500 text-sm mb-2">{exp.duration}</div>
                <div className="text-gray-500 text-xs mb-2 text-center">{exp.description}</div>
                {editId === exp._id ? (
                  <form onSubmit={handleUpdateExperience} className="w-full flex flex-col gap-2 mt-2">
                    <input
                      type="text"
                      value={editCompany}
                      onChange={e => setEditCompany(e.target.value)}
                      className="border px-2 py-1 rounded bg-white text-gray-900 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                      placeholder="Company"
                    />
                    <input
                      type="text"
                      value={editPosition}
                      onChange={e => setEditPosition(e.target.value)}
                      className="border px-2 py-1 rounded bg-white text-gray-900 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                      placeholder="Position"
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
                      onClick={() => handleEdit(exp)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(exp._id)}
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

export default DashboardWorkExperience; 
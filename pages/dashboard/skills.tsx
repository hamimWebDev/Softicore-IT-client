import AdminDashboardLayout from "@/components/AdminDashboardLayout";
import { useGetAllJourneysQuery, useAddSkillMutation, useDeleteJourneyMutation, useUpdateJourneyMutation } from "@/redux/features/Journey/journeyApi";
import PrivateRoute from "@/pages/utils/PrivateRoute";
import { useState } from "react";
import { toast } from "sonner";

const DashboardSkills = () => {
  const { data = [], isLoading } = useGetAllJourneysQuery(undefined) as { data: any[]; isLoading: boolean };
  const [addSkill, { isLoading: isAdding }] = useAddSkillMutation();
  const [deleteJourney] = useDeleteJourneyMutation();
  const [updateJourney, { isLoading: isUpdating }] = useUpdateJourneyMutation();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [editId, setEditId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editDuration, setEditDuration] = useState("");
  const [editFile, setEditFile] = useState<File | null>(null);

  const handleAddSkill = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !file || !description || !duration) {
      setError("Name, image, description, and duration are required.");
      return;
    }
    setError("");
    const formData = new FormData();
    formData.append("file", file);
    formData.append("data", JSON.stringify({ name, type: "skill", description, duration }));
    let toastId: string | number = toast.loading("Adding skill...");
    try {
      await addSkill(formData).unwrap();
      toast.success("Skill added successfully!", { id: toastId });
      setName("");
      setFile(null);
      setDescription("");
      setDuration("");
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to add skill", { id: toastId });
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this skill?")) return;
    let toastId: string | number = toast.loading("Deleting skill...");
    try {
      await deleteJourney(id).unwrap();
      toast.success("Skill deleted successfully!", { id: toastId });
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to delete skill", { id: toastId });
    }
  };

  const handleEdit = (skill: any) => {
    setEditId(skill._id);
    setEditName(skill.name);
    setEditDescription(skill.description);
    setEditDuration(skill.duration);
    setEditFile(null);
  };

  const handleUpdateSkill = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editName || !editDescription || !editDuration) {
      toast.error("Name, description, and duration are required.");
      return;
    }
    const formData = new FormData();
    if (editFile) formData.append("file", editFile);
    formData.append("data", JSON.stringify({ name: editName, type: "skill", description: editDescription, duration: editDuration }));
    let toastId: string | number = toast.loading("Updating skill...");
    try {
      await updateJourney({ id: editId, formData }).unwrap();
      toast.success("Skill updated successfully!", { id: toastId });
      setEditId(null);
      setEditName("");
      setEditDescription("");
      setEditDuration("");
      setEditFile(null);
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to update skill", { id: toastId });
    }
  };

  const handleCancelEdit = () => {
    setEditId(null);
    setEditName("");
    setEditDescription("");
    setEditDuration("");
    setEditFile(null);
  };

  const skills = data.filter((item: any) => item.type === "skill");

  return (
    <AdminDashboardLayout>
      <PrivateRoute allowedRoles={["admin"]}>
        <h1 className="text-2xl font-bold mb-4">Skills (Admin)</h1>
        <form onSubmit={handleAddSkill} className="mb-6 w-full max-w-2xl mx-auto flex flex-col gap-4 sm:grid sm:grid-cols-2 md:grid-cols-4 items-center">
          <input
            type="text"
            placeholder="Skill Name"
            value={name}
            onChange={e => setName(e.target.value)}
            className="border px-3 py-2 rounded bg-white text-gray-900 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={e => setDescription(e.target.value)}
            className="border px-3 py-2 rounded bg-white text-gray-900 w-full min-h-[44px] resize-y focus:outline-none focus:ring-2 focus:ring-blue-400 transition md:col-span-2"
            rows={2}
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
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded w-full col-span-full md:col-span-1 hover:bg-blue-700 transition"
            disabled={isAdding}
          >
            {isAdding ? "Adding..." : "Add Skill"}
          </button>
        </form>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        {isLoading ? (
          <div>Loading skills...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {skills.map((skill: any) => (
              <div key={skill._id} className="flex flex-col items-center border rounded p-4 bg-white dark:bg-gray-800">
                <img src={skill.icon} alt={skill.name} className="w-16 h-16 object-contain mb-2" />
                <div className="font-semibold mb-2">{skill.name}</div>
                <div className="text-gray-500 text-sm mb-2">{skill.duration}</div>
                <div className="text-gray-500 text-xs mb-2 text-center">{skill.description}</div>
                {editId === skill._id ? (
                  <form onSubmit={handleUpdateSkill} className="w-full flex flex-col gap-2 mt-2">
                    <input
                      type="text"
                      value={editName}
                      onChange={e => setEditName(e.target.value)}
                      className="border px-2 py-1 rounded bg-white text-gray-900 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                      placeholder="Skill Name"
                    />
                    <textarea
                      value={editDescription}
                      onChange={e => setEditDescription(e.target.value)}
                      className="border px-2 py-1 rounded bg-white text-gray-900 w-full min-h-[36px] resize-y focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                      placeholder="Description"
                      rows={2}
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
                      onClick={() => handleEdit(skill)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(skill._id)}
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

export default DashboardSkills; 
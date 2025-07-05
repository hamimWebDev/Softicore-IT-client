import { useState } from "react";
import { useRouter } from "next/router";
import AdminDashboardLayout from "@/components/AdminDashboardLayout";
import PrivateRoute from "@/pages/utils/PrivateRoute";
import { useGetAllTeamMembersQuery, useDeleteTeamMemberMutation } from "@/redux/features/team/teamApi";
import Link from "next/link";

const DashboardTeam = () => {
  const { data, isLoading } = useGetAllTeamMembersQuery(undefined);
  const [deleteTeamMember, { isLoading: isDeleting }] = useDeleteTeamMemberMutation();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const router = useRouter();
  const teamMembers: any[] = Array.isArray(data) ? data : [];

  const handleUpdate = (member: any) => {
    // Navigate to update page with member ID
    router.push(`/dashboard/update-team/${member._id || member.id}`);
  };

  const handleDelete = async (member: any) => {
    const memberId = member._id || member.id;
    if (window.confirm(`Are you sure you want to delete "${member.name}"? This action cannot be undone.`)) {
      try {
        setDeletingId(memberId);
        await deleteTeamMember(memberId).unwrap();
        // Success message could be shown here
      } catch (error) {
        console.error('Failed to delete team member:', error);
        alert('Failed to delete team member. Please try again.');
      } finally {
        setDeletingId(null);
      }
    }
  };

  return (
    <AdminDashboardLayout>
      <PrivateRoute allowedRoles={["admin"]}>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <h1 className="text-2xl font-bold">Team Members</h1>
          <Link href="/dashboard/create-team">
            <span className="px-6 py-2 bg-teal-300 text-gray-900 rounded-full font-semibold shadow hover:bg-teal-400 transition cursor-pointer">
              Add Member
            </span>
          </Link>
        </div>
        
        {/* Desktop Table View */}
        <div className="hidden lg:block overflow-x-auto bg-white dark:bg-gray-800 rounded-xl shadow-md">
          <table className="min-w-full text-left">
            <thead className="bg-gray-100 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-4 font-semibold">Image</th>
                <th className="px-6 py-4 font-semibold">Name</th>
                <th className="px-6 py-4 font-semibold">Position</th>
                <th className="px-6 py-4 font-semibold">Email</th>
                <th className="px-6 py-4 font-semibold">Phone</th>
                <th className="px-6 py-4 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr><td colSpan={6} className="px-6 py-8 text-center">Loading...</td></tr>
              ) : teamMembers.length === 0 ? (
                <tr><td colSpan={6} className="px-6 py-8 text-center">No team members found.</td></tr>
              ) : (
                teamMembers.map((member: any) => {
                  const memberId = member._id || member.id;
                  const isThisDeleting = deletingId === memberId;
                  
                  return (
                    <tr key={memberId} className="border-b last:border-b-0">
                      <td className="px-6 py-4">
                        <img 
                          src={member.image} 
                          alt={member.name} 
                          className="w-16 h-16 object-cover rounded-lg border"
                          onError={(e) => {
                            e.currentTarget.src = "/icon/profile_image.jpg";
                          }}
                        />
                      </td>
                      <td className="px-6 py-4 font-medium">{member.name}</td>
                      <td className="px-6 py-4">{member.position}</td>
                      <td className="px-6 py-4">{member.email}</td>
                      <td className="px-6 py-4">{member.phone}</td>
                      <td className="px-6 py-4 flex gap-2">
                        <button
                          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded font-semibold transition"
                          onClick={() => handleUpdate(member)}
                        >
                          Update
                        </button>
                        <button
                          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
                          onClick={() => handleDelete(member)}
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

        {/* Mobile Card View */}
        <div className="lg:hidden space-y-4">
          {isLoading ? (
            <div className="text-center py-8">Loading...</div>
          ) : teamMembers.length === 0 ? (
            <div className="text-center py-8">No team members found.</div>
          ) : (
            teamMembers.map((member: any) => {
              const memberId = member._id || member.id;
              const isThisDeleting = deletingId === memberId;
              
              return (
                <div key={memberId} className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-20 h-20 object-cover rounded-lg border flex-shrink-0"
                      onError={(e) => {
                        e.currentTarget.src = "/icon/profile_image.jpg";
                      }}
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-lg mb-1">{member.name}</h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-1">{member.position}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 break-all">{member.email}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{member.phone}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      className="flex-1 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded font-semibold transition"
                      onClick={() => handleUpdate(member)}
                    >
                      Update
                    </button>
                    <button
                      className="flex-1 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
                      onClick={() => handleDelete(member)}
                      disabled={isThisDeleting}
                    >
                      {isThisDeleting ? "Deleting..." : "Delete"}
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </PrivateRoute>
    </AdminDashboardLayout>
  );
};

export default DashboardTeam; 
import AdminDashboardLayout from "@/components/AdminDashboardLayout";
import PrivateRoute from "@/pages/utils/PrivateRoute";
import dynamic from "next/dynamic";
import { NextPage } from "next";

const AdminDashboardContent = dynamic(
  () => import("@/components/AdminDashboardContent")
);

const Dashboard: NextPage = () => (
  <AdminDashboardLayout>
    <PrivateRoute allowedRoles={["admin"]}>
      <AdminDashboardContent />
    </PrivateRoute>
  </AdminDashboardLayout>
);

export default Dashboard;

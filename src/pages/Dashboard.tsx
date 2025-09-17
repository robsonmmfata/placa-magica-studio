import { useAuth } from "@/contexts/AuthContext";
import { AdminDashboard } from "@/components/AdminDashboard";
import { ClientDashboard } from "@/components/ClientDashboard";
import { Navigate } from "react-router-dom";

const Dashboard = () => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div>
      {user?.role === 'admin' ? <AdminDashboard /> : <ClientDashboard />}
    </div>
  );
};

export default Dashboard;
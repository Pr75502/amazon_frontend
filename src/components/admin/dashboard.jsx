import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchStats } from "../../features/adminSlice";
import StatsCard from "../../components/admin/StatsCard";

const AdminDashboard = () => {
  const dispatch = useDispatch();

  const { users, products, orders } = useSelector(
    (state) => state.admin
  );

  useEffect(() => {
    dispatch(fetchStats());
  }, [dispatch]);

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Admin Dashboard</h1>

      {/* Stats Cards */}
      <div className="flex flex-wrap gap-4 mb-6">
        <StatsCard title="Total Users" value={users} />
        <StatsCard title="Total Products" value={products} />
        <StatsCard title="Total Orders" value={orders} />
      </div>

      {/* Optional Content */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-2">
          Welcome, Admin ✅
        </h2>
        <p className="text-gray-600">
          Manage products, users, and orders from the sidebar.
        </p>
      </div>
    </div>
  );
};

export default AdminDashboard;

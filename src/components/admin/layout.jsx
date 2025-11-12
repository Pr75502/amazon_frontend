import { Link, Outlet, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../features/userSlice";

const AdminLayout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-8 text-gray-800">Admin Panel</h2>

        <nav className="space-y-4">
          <Link
            to="/admin/dashboard"
            className="block py-2 px-3 rounded hover:bg-gray-200"
          >
            Dashboard
          </Link>

          <Link
            to="/admin/products"
            className="block py-2 px-3 rounded hover:bg-gray-200"
          >
            Products
          </Link>

          <Link
            to="/admin/orders"
            className="block py-2 px-3 rounded hover:bg-gray-200"
          >
            Orders
          </Link>

          <Link
            to="/admin/users"
            className="block py-2 px-3 rounded hover:bg-gray-200"
          >
            Users
          </Link>

          <button
            onClick={handleLogout}
            className="w-full py-2 px-3 rounded bg-red-600 text-white hover:bg-red-700 mt-6"
          >
            Logout
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;

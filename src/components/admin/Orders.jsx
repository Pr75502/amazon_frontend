import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllOrders } from "../../features/adminSlice";

const AdminOrders = () => {
  const dispatch = useDispatch();
  const { orderList, error } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(fetchAllOrders());
  }, [dispatch]);

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Manage Orders</h1>
      <table className="w-full bg-white shadow-md rounded-lg">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-3">Order ID</th>
            <th className="p-3">User</th>
            <th className="p-3">Amount</th>
            <th className="p-3">Status</th>
            <th className="p-3">Date</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orderList &&
            orderList.map((order) => (
              <tr key={order._id} className="border-b">
                <td className="p-3">{order._id}</td>
                <td className="p-3">{order.user?.name || "N/A"}</td>
                <td className="p-3">₹{order.totalAmount}</td>
                <td className="p-3">{order.status}</td>
                <td className="p-3">{new Date(order.createdAt).toLocaleDateString()}</td>
                <td className="p-3">
                  <button className="bg-blue-600 text-white px-3 py-1 rounded">
                    Update Status
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminOrders;

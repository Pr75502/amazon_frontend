import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedAdmin = ({ children }) => {
  const { user } = useSelector((state) => state.user);

 
  if (!user) return <Navigate to="/login" replace />;


  if (user.role !== "admin") return <Navigate to="/admin/not-authorized" replace />;

  return children;
};

export default ProtectedAdmin;

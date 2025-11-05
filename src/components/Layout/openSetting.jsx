import { Link } from "react-router-dom";

import { logout } from "../../features/userSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";




const OpenSetting = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const token = localStorage.getItem("token");
    const handleLogout = () => {

        dispatch(logout());
        navigate("/login");


    };




    return (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
            {token && (
                <div className="py-1">
                    <div>
                        <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</Link>
                    </div>
                    <div>
                        <Link to="/orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Orders</Link>
                    </div>
                    <div>
                        <Link to="/addproduct" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Add Product</Link>
                    </div>
                    <div>
                    </div>
                    <div className="border-t border-gray-100"></div>
                </div>
            )}

            {token ? (
                <div className="py-1">
                    <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Logout</button>
                </div>
            ) : (
                <div className="py-1">
                    <div>
                        <Link to="/login" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Login</Link>
                    </div>
                    <div>
                        <Link to="/signup" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Signup</Link>
                    </div>
                </div>
            )}


        </div>
    );
};
export default OpenSetting;

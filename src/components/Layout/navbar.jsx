import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../features/userSlice";
import { useState } from "react";

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const [searchQuery, setSearchQuery] = useState("");

    const handleLogout = () => {
        dispatch(logout());
        navigate("/login");
    };

    const handleProfile = () => {
        navigate(`/profile`);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/search?query=${searchQuery}`);
        }
    };

    return (
        <div className="bg-gray-900 text-white flex justify-between items-center h-16 px-4">
            <h1 className="text-xl font-bold">
                <a href="/" className="text-white no-underline">
                    Amazon Clone
                </a>
            </h1>
            <div className="flex items-center">
                <form onSubmit={handleSearch} className="flex">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search products..."
                        className="w-80 p-1 text-black"
                    />
                    <button type="submit"
                        className="p-1 bg-yellow-500 border-none text-gray-900"
                    > Search</button>
                </form>
            </div>
            <div className="flex items-center space-x-4">
                <a href="/" className="text-white no-underline">
                    Home
                </a>
                <a href="/cart" className="text-white no-underline">
                    Cart
                </a>
            </div>
            <button
                onClick={() => navigate("/openSetting")}
                className="p-2 rounded hover:bg-gray-200"
            >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <circle cx="12" cy="5" r="2" />
                    <circle cx="12" cy="12" r="2" />
                    <circle cx="12" cy="19" r="2" />
                </svg>
            </button>
        </div>
    );
};

export default Navbar;
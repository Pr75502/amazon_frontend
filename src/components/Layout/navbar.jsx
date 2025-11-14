import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../features/userSlice";
import { useState } from "react";
import { FaSearch, FaShoppingCart, FaUser, FaSignOutAlt, FaSignInAlt, FaCog, FaAmazon } from "react-icons/fa";

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const [searchQuery, setSearchQuery] = useState("");
    const { user } = useSelector(state => state.user);

    const handleLogout = () => {
        dispatch(logout());
        navigate("/login");
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/search?query=${searchQuery}`);
        }
    };

    return (
        <div className="bg-gray-900 text-white flex justify-between items-center h-16 px-4">
            <a href="/" className="text-white no-underline">
                <div className="flex items-center gap-2">
                    <FaAmazon size={28} />
                    <h1 className="text-xl font-bold">Amazon Clone</h1>
                </div>
            </a>
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
                        className="p-2 bg-yellow-500 border-none text-gray-900 flex items-center justify-center"
                    >
                        <FaSearch />
                    </button>
                </form>
            </div>
            <div className="flex items-center space-x-4">
                <a href="/" className="text-white no-underline">
                    Home
                </a>
                <a href="/cart" className="text-white no-underline flex items-center gap-1">
                    <FaShoppingCart /> Cart
                </a>
                {token ? (
                    <>
                        <a href="/profile" className="text-white no-underline flex items-center gap-1">
                            <FaUser /> {user ? user.name : 'Profile'}
                        </a>
                        <button onClick={handleLogout} className="text-white no-underline flex items-center gap-1 bg-transparent border-none">
                            <FaSignOutAlt /> Logout
                        </button>
                    </>
                ) : (
                    <a href="/login" className="text-white no-underline flex items-center gap-1">
                        <FaSignInAlt /> Login
                    </a>
                )}
            </div>
            <button
                onClick={() => navigate("/openSetting")}
                className="p-2 rounded hover:bg-gray-700"
            >
                <FaCog />
            </button>
        </div>
    );
};

export default Navbar;
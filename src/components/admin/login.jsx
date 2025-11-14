import { useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../features/userSlice";
import { toast } from "react-hot-toast";
import { FaSignInAlt } from "react-icons/fa";

const AdminLogin = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        emailRef.current.value = "pp1614582@gmail.com";
        passwordRef.current.value = "pass1234";
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        const userData = { email, password };
        try {
            const res = await dispatch(login(userData)).unwrap();
            if (res.data.user.role !== "admin") {
                toast.error("Access denied. You are not an admin.");
                navigate("/admin/not-authorized");
                return;
            }
            toast.success("Login successful");
            navigate("/admin/dashboard");

            emailRef.current.value = "";
            passwordRef.current.value = "";
        } catch (error) {
            toast.error(error.message || "Login failed");
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-2xl font-bold text-center text-gray-800 mb-8">Admin Login</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">Email</label>
                        <input
                            type="email"
                            placeholder="Admin Email"
                            ref={emailRef}
                            className="w-full p-2 border border-gray-300 rounded-lg"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">Password</label>
                        <input
                            type="password"
                            placeholder="Admin Password"
                            ref={passwordRef}
                            className="w-full p-2 border border-gray-300 rounded-lg"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center gap-2"
                    >
                        <FaSignInAlt /> Login As Admin
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;
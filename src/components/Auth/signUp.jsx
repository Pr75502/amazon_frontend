import { useRef } from "react";
import { useDispatch } from "react-redux";
import { register } from "../../features/userSlice";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { FaUserPlus } from "react-icons/fa";

const SignUp = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const addressRef = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const name = nameRef.current.value;
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        const address = addressRef.current.value;

        const userData = {
            name,
            email,
            password,
            address,
        };
        try {
            await dispatch(register(userData)).unwrap();
            toast.success("Registration successful");
            navigate("/login");
            nameRef.current.value = "";
            emailRef.current.value = "";
            passwordRef.current.value = "";
            addressRef.current.value = "";
        } catch (error) {
            toast.error(error.message || "Registration failed");
        }
    };
    return (
        <div className="bg-gray-100 min-h-screen flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-2xl font-bold text-center text-gray-800 mb-8">Create Account</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">Name</label>
                        <input type="text" placeholder="Name" ref={nameRef} className="w-full p-2 border border-gray-300 rounded-lg" />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">Email</label>
                        <input type="email" placeholder="Email" ref={emailRef} className="w-full p-2 border border-gray-300 rounded-lg" />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">Password</label>
                        <input type="password" placeholder="Password" ref={passwordRef} className="w-full p-2 border border-gray-300 rounded-lg" />
                    </div>
                    <div>
                        <label htmlFor="address" className="block text-gray-700 font-semibold mb-2">Address</label>
                        <input type="text" placeholder="Address" ref={addressRef} className="w-full p-2 border border-gray-300 rounded-lg" />
                    </div>
                    <p className="text-xs text-gray-600">
                        By signing up, you agree to the Amazon Clone Conditions of Use & Sale.
                        Please see our Privacy Notice, our Cookies Notice and our
                        Interest-Based Ads Notice.
                    </p>
                    <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center gap-2">
                        <FaUserPlus /> Sign Up
                    </button>
                    <p className="text-center mt-4">
                        Already have an account? <a href="/login" className="text-blue-500 hover:underline">Login</a>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default SignUp;

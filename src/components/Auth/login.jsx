import { useRef } from "react"
import { useDispatch } from "react-redux"
import { login } from "../../features/userSlice";
import { toast } from "react-hot-toast"
import { useNavigate } from "react-router-dom"



const Login = () => {
    const dispatch = useDispatch()
    const emailRef = useRef()
    const passwordRef = useRef()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const email = emailRef.current.value
        const password = passwordRef.current.value

        const userData = {
            email, password
        }
        try {
            await dispatch(login(userData)).unwrap()
            toast.success("Login successful")
            navigate("/");
            emailRef.current.value = ""
            passwordRef.current.value = ""
        } catch (error) {
            toast.error(error.message || "Login failed")
        }


    }
    return (
        <div className="bg-gray-100 min-h-screen flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-2xl font-bold text-center text-gray-800 mb-8">Login</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">Email</label>
                        <input type="email" placeholder="Email" ref={emailRef} className="w-full p-2 border border-gray-300 rounded-lg" />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">Password</label>
                        <input type="password" placeholder="Password" ref={passwordRef} className="w-full p-2 border border-gray-300 rounded-lg" />
                    </div>
                    <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg">Login</button>
                </form>
                <p className="text-center mt-4">
                    Don't have an account? <a href="/signup" className="text-blue-500 hover:underline">Sign up</a>
                </p>
            </div>
        </div>
    )

}
export default Login
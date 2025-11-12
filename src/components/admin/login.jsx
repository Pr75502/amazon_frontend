import { useRef } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { login } from "../../features/userSlice"
import { toast } from "react-hot-toast"
import { useEffect } from "react"





const AdminLogin = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const dispatch = useDispatch();
    const navigate = useNavigate();



     useEffect(() => {
       emailRef.current.value = "pp1614582@gmail.com";
       passwordRef.current.value = "pass1234";
     }, []);


    const handleSubmit = async(e) => {
        e.preventDefault();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        const userData = { email, password }
        try {
            const res=await dispatch(login(userData)).unwrap();
            if (res.data.user.role !== "admin") {
              toast.error("Access denied. You are not an admin.");
              navigate("/admin/not-authorized")
                return;
                
            }
                toast.success("Login successful");
                navigate("/admin/dashboard");
            
            emailRef.current.value = "";
            passwordRef.current.value = "";
        
            
        } catch (error) {
            toast.error(error.message || "Login failed");
        }
    }

    return (
      <div>
        <form onSubmit={handleSubmit}>
            <input type="email" placeholder="Admin Email" ref={emailRef} />
          <input type="password" placeholder="Admin Password" ref={passwordRef} />
          <button type="submit">Login As Admin</button>
        </form>
      </div>
    );



}
export default AdminLogin
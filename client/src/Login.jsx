import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export default function Login(){

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = {email,password}
        try {
            const response = await axios.post("http://localhost:3000/user/login", user);
            if(response.status === 200){
                localStorage.setItem("token", response.data.token);
                navigate("/");
            }
        } catch (error) {
            console.log(error);
        }
        setEmail("");
        setPassword("");
    }

    return(
        <div className="flex flex-col items-center justify-center max-w-lg w-full min-w-sm my-50 mx-2 rounded-lg bg-white p-6 shadow">
                <div className="text-center text-2xl text-purple-700 font-bold mb-5 ">Login</div>
                <input className="shadow my-2 border border-gray-400 rounded-md w-full max-w-xs p-2" onChange={(e) => setEmail(e.target.value)} value={email} placeholder="Email" type="email" />
                <input className="shadow my-2 border border-gray-400 rounded-md w-full max-w-xs p-2" onChange={(e) => setPassword(e.target.value)} value={password} placeholder="Password" type="password" />
                <button className="mt-2 px-6 py-2 text-white bg-blue-500 rounded-md cursor-pointer hover:bg-blue-600 transition w-full max-w-xs" onClick={handleSubmit}>Login</button>
        </div>
    )
}
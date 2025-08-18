import checkedIcon from "./assets/checked.png"
import cancelIcon from "./assets/cancel.png"
import { useNavigate } from "react-router-dom"

function Accepted(props) {
    const navigate = useNavigate();
    return (
        <div className="flex flex-col items-center justify-center bg-white mx-8 my-40 rounded-lg w-full max-w-2xl py-12">
            <img src={checkedIcon} alt="success" className="w-25 h-25" />
            <div className="text-2xl font-bold mt-4">Thank You</div>
            <div className="text-sm text-gray-500">Your order has been placed successfully!</div>
            <div className="text-sm">Order Id: {props.order}</div>
            <button onClick={() => navigate("/")}className="text-green-700 hover:text-white border border-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition mt-5">Go to Home</button>
        </div>
    )
}

function Cancelled(props) {
    const navigate = useNavigate();
    return (
        <div className="flex flex-col items-center justify-center bg-white mx-8 my-40 rounded-lg w-full max-w-2xl py-12">
            <img src={cancelIcon} alt="success" className="w-25 h-25" />
            <div className="text-2xl font-bold mt-4">Sorry</div>
            <div className="text-sm text-gray-500">Your Order could not be placed!</div>
            <button onClick={() => navigate("/")} className="text-red-600 hover:text-white border border-red-600 hover:bg-red-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition mt-5">Go to Home</button>
        </div>
    )
}

export { Accepted, Cancelled }  

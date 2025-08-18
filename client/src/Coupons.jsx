import { useNavigate } from "react-router-dom";

export default function Coupons() {
    const navigate = useNavigate();
    return (
        <div className="flex justify-center items-center
        w-full">
            <div className="bg-white rounded-md m-4 w-full">
                <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200 shadow">
                    <div className="text-xs font-bold">APPLY COUPON</div>
                    <button className="font-bold w-6 h-6 cursor-pointer " onClick={() => navigate("/cart")}>X</button>
                </div>
                <div className="px-2 overflow-y-auto max-h-[360px]">
                    <Coupon />
                    <Coupon />
                    <Coupon />
                    <Coupon />
                    <Coupon />
                    <Coupon />
                    <Coupon />
                    <Coupon />
                    <Coupon />
                    <Coupon />
                    <Coupon />
                </div>
                <div className="p-6 flex justify-between items-center shadow-[0_-4px_6px_rgba(0,0,0,0.1)]">
                    <div>
                        <div className="font-bold text-xs text-gray-600 w-30">Maximum savings:</div>
                        <div className="font-bold">₹ 0</div>
                    </div>
                    <button className="text-white font-bold bg-red-400 w-full py-3 rounded-lg hover:bg-red-600 transition cursor-pointer ml-15">APPLY</button>
                </div>
            </div>
        </div>
    )
}

function Coupon(props) {
    return (
        <div className="border-b border-gray-200 p-6">
            <div className="flex gap-4 items-center">
                <input type="checkbox" value={true} className="w-4 h-4 cursor-pointer"/>
                <div className="font-bold text-red-500 px-4 py-1 border-dashed border border-red-500 w-fit text-sm rounded-sm">COUPON{props.name}</div>
            </div>
            <div className="flex flex-col ml-8 mt-3">
                <div className="font-bold text-sm">Save ₹{props.discount}</div>
                <div className="text-xs font-light">Minimum cart value ₹{props.min}</div>
            </div>
        </div>
    )
}
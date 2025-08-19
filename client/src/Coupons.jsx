import { useNavigate, useOutletContext } from "react-router-dom";
import { couponsData } from "./couponsData";
import { useEffect, useState } from "react";

export default function Coupons() {
    const { itemTotal, applyDiscount } = useOutletContext();
    const navigate = useNavigate();
    const [selectedCoupon, setSelectedCoupon] = useState(null);

    return (
        <div className="flex justify-center items-center
        w-full">
            <div className="bg-white rounded-md m-4 w-full">
                <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200 shadow">
                    <div className="text-xs font-bold">AVAILABLE COUPONS</div>
                    <button className="font-bold w-6 h-6 cursor-pointer " onClick={() => navigate("/cart")}>X</button>
                </div>
                <div className="px-2 overflow-y-auto max-h-[360px]">
                    {couponsData.map((coupon) => {
                        return <Coupon 
                        key={coupon.id}
                        coupon={coupon}
                        itemTotal={itemTotal}
                        selectedCoupon={selectedCoupon}
                        setSelectedCoupon={setSelectedCoupon}
                        />
                    })}
                </div>
                <div className="p-6 flex justify-between items-center shadow-[0_-4px_6px_rgba(0,0,0,0.1)]">
                    <button className="text-white font-bold bg-red-400 w-full py-3 rounded-lg hover:bg-red-600 transition cursor-pointer mx-15 disabled:cursor-not-allowed disabled:bg-gray-300"
                    onClick={() => {
                        if (selectedCoupon) {
                            const selected = couponsData.find(c => c.id === selectedCoupon);
                            applyDiscount(selected);
                            navigate("/cart")
                        }
                    }}
                    disabled={!selectedCoupon}
                    >APPLY</button>
                </div>
            </div>
        </div>
    )
}

function Coupon({ coupon, itemTotal, selectedCoupon, setSelectedCoupon }) {
    const eligible = itemTotal >= coupon.minValue;
    const isSelected = selectedCoupon === coupon.id;

    const discount = eligible ? Math.min(coupon.off * itemTotal / 100, coupon.maxDiscount) : 0;

    return (
        <div className={`border-b border-gray-200 p-6 ${!eligible ? "opacity-50 pointer-events-none": ""}`}>
            <div className="flex gap-4 items-center">
                <input type="checkbox" checked={isSelected} 
                onChange={() => setSelectedCoupon(isSelected ? null : coupon.id)}
                disabled={!eligible}
                className="w-4 h-4 cursor-pointer"/>
                <div className="font-bold text-red-500 px-4 py-1 border-dashed border border-red-500 w-fit text-sm rounded-sm">{coupon.name}</div>
            </div>
            <div className="flex flex-col ml-8 mt-3">
                <div className="font-bold text-sm">Save ₹{discount}</div>
                <div className="text-xs font-light">Save {coupon.off}% upto ₹{coupon.maxDiscount}</div>
                <div className="text-xs font-light">Minimum cart value ₹{coupon.minValue}</div>
            </div>
        </div>
    )
}
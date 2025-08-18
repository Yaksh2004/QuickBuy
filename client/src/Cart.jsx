import Counter from "./Counter";
import { useNavigate, Outlet } from "react-router-dom";


export default function Cart() {
    const navigate = useNavigate();
    return (
        <div className="w-full max-w-3xl flex flex-col gap-5 py-5 ">
            <div className="bg-white rounded-2xl text-lg font-semibold mx-4 p-4 ">
                My Cart
            </div>
            <div className="rounded-2xl px-8 py-6 items-center bg-white mx-4 flex justify-between">
                <div className="font-bold text-sm">Apply Coupons</div>
                <button onClick={() => navigate("coupons")} className="cursor-pointer rounded-md hover:bg-red-600 hover:text-white transition border border-red-600 font-bold text-sm px-5 py-1 text-red-600">Apply</button>
            </div>
            <Outlet />
            <div className="flex rounded-2xl flex-col gap-8 px-8 py-6 bg-white mx-4">
                <CartProduct name="Product 1" image="https://i.pinimg.com/474x/9d/95/95/9d959515541b9f3dfa0e2fa7918ca4a2.jpg" weight="400gm" price="100" quantity="1" />
                <CartProduct name="Product 1" image="https://i.pinimg.com/474x/9d/95/95/9d959515541b9f3dfa0e2fa7918ca4a2.jpg" weight="400gm" price="100" quantity="1" />
                <CartProduct name="Product 1" image="https://i.pinimg.com/474x/9d/95/95/9d959515541b9f3dfa0e2fa7918ca4a2.jpg" weight="400gm" price="100" quantity="1" />
            </div>
            <div className=" flex flex-col rounded-2xl px-4 py-3 bg-white mx-4">
                <div className="text-lg font-bold">Bill details</div>
                <div className="ml-1 flex text-sm justify-between">
                    <div>Items total</div>
                    <div>₹0</div>
                </div>
                <div className="ml-1 flex text-sm justify-between">
                    <div>Delivery charge</div>
                    <div>₹0</div>
                </div>
                <div className="ml-1 flex text-sm justify-between">
                    <div>Discount</div>
                    <div>₹0</div>
                </div>
                <div className="flex justify-between mt-1 font-bold">
                    <div>Grand total</div>
                    <div>₹0</div>
                </div>
                <div className="mt-3 p-3 rounded-xl bg-green-50 text-green-700 font-bold text-sm text-center">
                    You saved <span className="text-lg">₹0</span> on this order 🎊
                </div>
            </div>
            <button className="flex cursor-pointer hover:bg-green-700 transition bg-green-600 rounded-md px-4 py-3 mx-4 justify-between text-white">
                <span className="font-bold ">₹0</span>
                <span>Checkout</span>
            </button>
        </div>
    )
}

function CartProduct(props) {
    return (
    <div className="flex items-center justify-between w-full">
        <div className="flex">
            <div className="rounded-lg overflow-hidden">
                <img className="h-20 w-20 object-cover" src={props.image} alt={props.name} />
            </div>
            <div className="flex flex-col ml-4">
                <div className="text-sm">{props.name}</div>
                <div className="text-sm text-gray-500">{props.weight}</div>
                <div className="text-sm font-semibold">₹{props.price}</div>
            </div>
        </div>
        <div><Counter /></div>
    </div>)
}

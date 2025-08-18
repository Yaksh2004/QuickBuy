import Counter from "./Counter";
import { useNavigate, Outlet } from "react-router-dom";
import { productsData } from "./productsData";
import { useState, useEffect } from "react";

export default function Cart({ cart, increase, decrease }) { 
    const navigate = useNavigate();
    const [itemTotal, setItemTotal] = useState(0);
    const [delivery, setDelivery] = useState(0);
    const [grand, setGrand] = useState(0);
    const [savings, setSavings] = useState(0);
    const [discount, setDiscount] = useState(0);

    useEffect(() => {
        let total = 0;
        Object.entries(cart).forEach(([id, quantity]) => {
            const product = productsData.find(p => p.id === parseInt(id));
            if (product) total += product.price * quantity;
        });

        const del = total > 0 && total < 300 ? 40 : 0;
        const save = total > 300 ? 40 : 0;
        setItemTotal(total);
        setDelivery(del);
        setSavings(save);
        setGrand(total + del);
    }, [cart]);


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
                {Object.entries(cart).length === 0 ? (
                    <div className="text-center text-sm font-bold">Your cart is empty</div>
                ) : (
                    Object.entries(cart).map(([id, quantity]) => {
                        const product = productsData.find(p => p.id === parseInt(id));
                        return <CartProduct 
                        key={id}
                        name={product.name} 
                        image={product.image} 
                        weight={product.weight} 
                        price={product.price} 
                        quantity={quantity} 
                        onInc={() => increase(id)} 
                        onDec={() => decrease(id)} />
                    })
                )}
            </div>
            <div className=" flex flex-col rounded-2xl px-4 py-3 bg-white mx-4">
                <div className="text-lg font-bold">Bill details</div>
                <div className="ml-1 flex text-sm justify-between">
                    <div>Items total</div>
                    <div>₹{itemTotal}</div>
                </div>
                <div className="ml-1 flex text-sm justify-between">
                    <div>Delivery charge</div>
                    <div>₹{delivery}</div>
                </div>
                <div className="ml-1 flex text-sm justify-between">
                    <div>Discount</div>
                    <div>₹0</div>
                </div>
                <div className="flex justify-between mt-1 font-bold">
                    <div>Grand total</div>
                    <div>₹{grand}</div>
                </div>
                <div className="mt-3 p-3 rounded-xl bg-green-50 text-green-700 font-bold text-sm text-center">
                    You saved <span className="text-lg">₹{savings}</span> on this order 🎊
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
        <div><Counter count={props.quantity} onIncrease={props.onInc} onDecrease={props.onDec} /></div>
    </div>)
}

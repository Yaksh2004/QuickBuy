import { useState } from "react";

export default function Counter() {
    const [count, setCount] = useState(1);

    const increase = () => {
    setCount(count + 1);
    };

    const decrease = () => {
        if(count > 1) {
            setCount(count - 1);
        }
    };

    return (
        <div className="flex gap-1 bg-emerald-600 rounded-xl text-white items-center border px-3 py-1">
            <button onClick={decrease} className="w-4 text-md font-bold cursor-pointer">-</button>
            <div className="text-sm w-4 text-center font-bold">{count}</div>
            <button onClick={increase} className="w-4 text-md font-bold cursor-pointer ">+</button>
        </div>
    )
}


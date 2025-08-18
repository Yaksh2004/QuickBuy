import Counter from "./Counter";

export default function Product(props) {
    return (
        <div className="flex flex-col h-fit rounded-lg shadow-md bg-white">
            <div className="aspect-[1/1] w-full overflow-hidden p-2">
                <img
                    className="h-full w-full object-cover rounded-lg"
                    src={props.image}
                    alt={props.name}
                />
            </div>

            <div className="flex flex-col flex-1 p-2.5">
                <div>
                    <div className="line-clamp-1 font-semibold text-sm">{props.name}</div>
                    <div className="text-xs text-gray-500">{props.weight}</div>
                </div>
                <div className="mt-2 flex justify-between">
                    <div className="font-semibold text-sm mt-2">₹{props.price}</div>

                    { props.quantity > 0 ? <Counter count={props.quantity} onIncrease={props.onInc} onDecrease={props.onDec} /> : 
                    <button onClick={props.onAdd} type="button" className="flex justify-center items-center bg-emerald-600 rounded-xl text-white border px-3 py-1 text-sm font-bold w-[80px] h-[32px] transition hover:bg-emerald-700">Add</button>
                }
                </div>
            </div>
        </div>
    )
}

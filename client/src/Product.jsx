export default function Product(props) {
    return (
        <div className="flex flex-col rounded-lg shadow-md bg-white">
            <div className="aspect-[1/1] w-full overflow-hidden p-2">
                <img
                    className="h-full w-full object-cover rounded-lg"
                    src={props.image}
                    alt={props.name}
                />
            </div>

            <div className="flex flex-col flex-1 p-2.5">
                <div>
                    <div className="line-clamp-1 font-semibold text-lg">{props.name}</div>
                    <div className="text-sm text-gray-500">{props.weight}</div>
                </div>
                <div className="mt-2 flex justify-between">
                    <div className="font-semibold mt-2">₹{props.price}</div>
                    <button type="button" className="text-green-700 hover:text-white border border-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 transition">Add</button>
                </div>
            </div>
        </div>
    )
}

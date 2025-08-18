export default function Counter(props) {
  return (
    <div className="flex justify-between items-center bg-emerald-600 rounded-xl text-white border px-3 py-1 text-sm font-bold w-[80px] h-[32px]">
      <button 
        onClick={props.onDecrease} 
        className="w-4 text-md font-bold cursor-pointer"
      >-</button>
      <div className="text-sm w-4 text-center font-bold">{props.count}</div>
      <button 
        onClick={props.onIncrease} 
        className="w-4 text-md font-bold cursor-pointer"
      >+</button>
    </div>
  )
}

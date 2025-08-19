export default function Login(){
    return(
        <div className="flex flex-col items-center justify-center max-w-lg w-full min-w-sm my-50 mx-2 rounded-lg bg-white p-6 shadow">
                <div className="text-center text-2xl text-purple-700 font-bold mb-5 ">Login</div>
                <input className="shadow my-2 border border-gray-400 rounded-md w-full max-w-xs p-2" placeholder="Email" type="email" />
                <input className="shadow my-2 border border-gray-400 rounded-md w-full max-w-xs p-2" placeholder="Password" type="password" />
                <button className="mt-2 px-6 py-2 text-white bg-blue-500 rounded-md cursor-pointer hover:bg-blue-600 transition w-full max-w-xs">Login</button>
        </div>
    )
}
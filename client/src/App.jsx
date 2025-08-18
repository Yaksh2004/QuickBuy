import {BrowserRouter, Routes, Route, Link, useNavigate, Outlet} from 'react-router-dom'
import Cart from './Cart'
import Products from './Products'
import Home from './Home'
import Coupons from './Coupons'
import {Accepted, Cancelled} from './Placed'


function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='products' element={<Products />} />
          <Route path="cart" element={<Cart />} >
            <Route path="coupons" element={<Coupons />} />
          </Route>
          <Route path="placed">
            <Route path="accepted" element={<Accepted />} />
            <Route path="cancelled" element={<Cancelled />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

function Layout() {
  return (
    <div className='flex flex-col min-h-screen'>
      <div className='flex gap-10 justify-center items-center p-6'>
        <Link to={"/"}>Home</Link>
        <Link to={"/products"}>Products</Link>
        <Link to={"/cart"}>Cart</Link>
      </div>
      <div className='flex flex-1 justify-center bg-gray-100'>
        <Outlet />
      </div>
      <div className='flex gap-5 p-6 justify-center items-center'>
        Footer
      </div>
    </div>
  )
}



export default App

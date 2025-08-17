import {BrowserRouter, Routes, Route, Link, useNavigate, Outlet} from 'react-router-dom'
import Cart from './Cart'
import Products from './Products'
import Home from './Home'


function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='products' element={<Products />} />
          <Route path="cart" element={<Cart />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

function Layout() {
  return (
    <div className='flex flex-col justify-between items-center h-screen '>
      <div className='flex gap-10 justify-center items-center p-8'>
        <Link to={"/"}>Home</Link>
        <Link to={"/products"}>Products</Link>
        <Link to={"/cart"}>Cart</Link>
      </div>
      <div className='flex flex-col justify-center items-center'>
        <Outlet />
      </div>
      <div className='flex gap-5 p-10 justify-center items-center'>
        Footer
      </div>
    </div>
  )
}



export default App

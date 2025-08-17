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
    <div className='h-screen '>
      <div className='flex gap-5  justify-center h-[5vh] items-center'>
        <Link to={"/"}>Home</Link>
        <Link to={"/products"}>Products</Link>
        <Link to={"/cart"}>Cart</Link>
      </div>
      <div className='h-[90vh] flex flex-col justify-center items-center'>
        <Outlet />
      </div>
      <div className='flex gap-5  justify-center h-[5vh] items-center'>
        Footer
      </div>
    </div>
  )
}



export default App

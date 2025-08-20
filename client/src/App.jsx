import {BrowserRouter, Routes, Route, Link, useNavigate, Outlet} from 'react-router-dom'
import Cart from './Cart'
import Products from './Products'
import Home from './Home'
import Login from './Login'
import Register from './Register'
import Coupons from './Coupons'
import {Accepted, Cancelled} from './Placed'
import { useState , useEffect } from "react";
import axios from "axios";


function App() {

  const [cart, setCart] = useState([]); 

  const [products, setProducts] = useState([]);

  useEffect(() => {
      try{
          axios.get("http://localhost:3000/products").then((response) => {
          setProducts(response.data.products);
          })
      } catch(error){
          console.log(error);
      }
  }, []);

  const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return token ? { Authorization: `${token}` } : {};
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return; // skip if not logged in

    axios
      .get("http://localhost:3000/cart", {
        headers: getAuthHeaders(),
      })
      .then((res) => setCart(res.data.cart))
      .catch((err) => console.error(err));
  }, []);


  const addToCart = (productId) => {
  setCart((prev) => {
    const exists = prev.some(
      (item) => (item.productId?._id || item.productId) === productId
    );
    if (exists) {
      return prev.map((item) =>
        (item.productId?._id || item.productId) === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    }
    return [...prev, { productId, quantity: 1 }];
  });

  const token = localStorage.getItem("token");
  if (!token) return;

  axios
    .post("http://localhost:3000/cart/add", { productId }, { headers: getAuthHeaders() })
    .then((res) => setCart(res.data.cart))
    .catch(console.error);
};

const increase = (productId) => {
  setCart((prev) =>
    prev.map((item) =>
      (item.productId?._id || item.productId) === productId
        ? { ...item, quantity: item.quantity + 1 }
        : item
    )
  );

  const token = localStorage.getItem("token");
  if (!token) return;

  axios
    .post("http://localhost:3000/cart/increase", { productId }, { headers: getAuthHeaders() })
    .then((res) => setCart(res.data.cart))
    .catch(console.error);
};

const decrease = (productId) => {
  setCart((prev) =>
    prev
      .map((item) =>
        (item.productId?._id || item.productId) === productId
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter((item) => item.quantity > 0)
  );

  const token = localStorage.getItem("token");
  if (!token) return;

  axios
    .post("http://localhost:3000/cart/decrease", { productId }, { headers: getAuthHeaders() })
    .then((res) => setCart(res.data.cart))
    .catch(console.error);
  };

  const handleCheckout = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const coupon = JSON.parse(localStorage.getItem("selectedCoupon")); // may be null
    try {
        const response = await axios.post(
            "http://localhost:3000/cart/checkout",
            {
                couponId: coupon?._id, // send if selected
            },
            {
                headers: { Authorization: `${token}` },
            }
        );

        // backend will send { success: true/false }
        if (response.data.success) {
            navigate("/placed/accepted");
        } else {
            navigate("/placed/cancelled");
        }
    } catch (err) {
        console.error("Checkout failed:", err);
        navigate("/placed/cancelled");
    }
};




  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='products' element={<Products products={products} cart={cart} addToCart={addToCart} increase={increase} decrease={decrease} />} />
          <Route path="cart" element={<Cart products={products} cart={cart} increase={increase} decrease={decrease} />} >
            <Route path="coupons" element={<Coupons />} />
          </Route>
          <Route path='login' element={<Login />}/>
          <Route path='register' element={<Register />}/>
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
        <Link to={"/login"}>Login</Link>
        <Link to={"/register"}>Register</Link>
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

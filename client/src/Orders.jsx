import { useState, useEffect } from "react";
import axios from "axios";

export default function OrdersList() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const DELIVERY_TIME_MINUTES = 10; // total delivery time in minutes
  const [now, setNow] = useState(Date.now()); // current time to trigger re-render

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get("http://localhost:3000/orders", {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });
        setOrders(res.data.orders || []);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Update 'now' every minute for dynamic countdown
  useEffect(() => {
    const interval = setInterval(() => {
      setNow(Date.now());
    }, 60000); // 60000 ms = 1 minute

    return () => clearInterval(interval); // cleanup on unmount
  }, []);

  const getRemainingMinutes = (createdAt) => {
    const createdTime = new Date(createdAt).getTime();
    const elapsedMinutes = Math.floor((now - createdTime) / 1000 / 60);
    const remaining = DELIVERY_TIME_MINUTES - elapsedMinutes;
    return remaining > 0 ? remaining : 0;
  };

  if (loading) return <div className="text-center py-10">Loading orders...</div>;
  if (!orders || orders.length === 0)
    return <div className="text-center py-10">No orders found.</div>;

  return (
    <div className="max-w-6xl mx-auto py-6 px-4">
      <h2 className="text-2xl font-bold mb-4">Your Orders</h2>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {orders.map((order) => {
          const remaining = getRemainingMinutes(order.createdAt);
          return (
            <div key={order._id} className="border rounded-lg p-4 bg-white shadow-sm">
              <div className="flex justify-between">
                <span className="font-semibold">Order ID:</span>
                <span>{order._id}</span>
              </div>
              <div className="flex justify-between mt-1">
                <span>Total:</span>
                <span>₹{order.total}</span>
              </div>
              <div className="flex justify-between mt-1">
                <span>Discount:</span>
                <span>₹{order.discount}</span>
              </div>
              <div className="flex justify-between mt-1">
                <span>Delivery:</span>
                <span>₹{order.delivery}</span>
              </div>
              <div className="flex justify-between mt-1 font-bold">
                <span>Grand Total:</span>
                <span>₹{order.grandTotal}</span>
              </div>

              {order.appliedCoupon && (
                <div className="mt-2 text-sm text-green-600">
                  Coupon Applied: {order.appliedCoupon}
                </div>
              )}

              <div className="mt-3">
                <div className="font-semibold mb-1">Products:</div>
                {order.products.map((p) => (
                  <div key={p._id} className="ml-2 flex justify-between text-sm">
                    <span>{p.productName}</span>
                    <span>{p.quantity} x ₹{p.price}</span>
                  </div>
                ))}
              </div>

              <div className="mt-2 text-xs text-blue-600 font-semibold">
                {remaining > 0
                  ? `Arriving in ~${remaining} min`
                  : "Delivered"}
              </div>

              <div className="mt-2 text-xs text-gray-500">
                Ordered on: {new Date(order.createdAt).toLocaleString()}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

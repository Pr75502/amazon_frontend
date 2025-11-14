import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getCartItems } from "../../features/cartSlice";
import { createOrder, verifyPayment } from "../../features/paymentSlice";
import { storeOrder } from "../../features/orderSlice";
import { FaCreditCard } from "react-icons/fa";

import { toast } from "react-hot-toast";

const Checkout = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.cartItems);
    const order = useSelector((state) => state.payment.order);
    const [total, setTotal] = useState(0);
    const [shippingAddress, setShippingAddress] = useState("");

    useEffect(() => {
        dispatch(getCartItems());
    }, [dispatch]);

    useEffect(() => {
        if (cartItems) {
            let sum = 0;
            cartItems.forEach((item) => {
                sum += item.product.price * item.quantity;
            });
            setTotal(sum);
        }
    }, [cartItems]);

 const handlePayment = async () => {
   if (!shippingAddress) {
     toast.error("Please enter your shipping address.");
     return;
   }

   // ✅ Ensure Razorpay SDK is loaded before using it
   const isLoaded = await loadRazorpayScript(
     "https://checkout.razorpay.com/v1/checkout.js"
   );
   if (!isLoaded) {
     toast.error(
       "Razorpay SDK failed to load. Check your internet connection."
     );
     return;
   }

   try {
     const newOrder = await dispatch(createOrder(total)).unwrap();

     const options = {
       key: import.meta.env.VITE_RAZORPAY_KEY_ID,
       amount: newOrder.amount,
       currency: "INR",
       name: "Amazon Clone",
       description: "Test Transaction",
       order_id: newOrder.id,
       handler: async (response) => {
         try {
           const verification = await dispatch(
             verifyPayment({
               razorpay_order_id: response.razorpay_order_id,
               razorpay_payment_id: response.razorpay_payment_id,
               razorpay_signature: response.razorpay_signature,
             })
           ).unwrap();

           await dispatch(storeOrder(shippingAddress));
           toast.success(verification.message);
         } catch (error) {
           console.log(error);
           toast.error(error.message || "Payment verification failed");
         }
       },
       prefill: {
         name: "John Doe",
         email: "john.doe@example.com",
         contact: "9999999999",
       },
       notes: {
         address: "Razorpay Corporate Office",
       },
       theme: {
         color: "#3399cc",
       },
     };

     // ✅ Now Razorpay is defined safely
     const rzp1 = new window.Razorpay(options);
     rzp1.open();
   } catch (error) {
     console.log(error);
     toast.error(error.message || "Order creation failed");
   }
 };

const loadRazorpayScript = (src) => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

    return (
        <div className="bg-gray-100 min-h-screen">
            <div className="container mx-auto py-8">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Checkout</h1>
                <div className="flex flex-col md:flex-row">
                    <div className="w-full md:w-2/3">
                        <div className="bg-white shadow-lg rounded-lg p-6 mb-4">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">Shipping Address</h2>
                            <input
                                type="text"
                                placeholder="Enter your shipping address"
                                value={shippingAddress}
                                onChange={(e) => setShippingAddress(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="bg-white shadow-lg rounded-lg p-6">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6">Order Summary</h2>
                            {cartItems &&
                                cartItems.map((item) => (
                                    <div key={item.product._id} className="flex justify-between items-center mb-4">
                                        <div>
                                            <h3 className="font-semibold text-gray-800">{item.product.name}</h3>
                                            <p className="text-gray-600">Quantity: {item.quantity}</p>
                                        </div>
                                        <p className="font-semibold text-gray-800">₹{item.product.price * item.quantity}</p>
                                    </div>
                                ))}
                            <hr className="my-4" />
                            <div className="flex justify-between mt-4">
                                <h3 className="text-xl font-bold text-gray-800">Total</h3>
                                <p className="text-xl font-bold text-gray-800">₹{total}</p>
                            </div>
                        </div>
                    </div>
                    <div className="w-full md:w-1/3 md:ml-8 mt-8 md:mt-0">
                        <div className="bg-white shadow-lg rounded-lg p-6">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6">Payment</h2>
                            <button
                                className="bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg w-full flex items-center justify-center gap-2"
                                onClick={handlePayment}
                            >
                                <FaCreditCard /> Pay Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;


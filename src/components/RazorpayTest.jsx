import { useDispatch } from "react-redux";
import { createOrder, verifyPayment } from "../features/paymentSlice";
import { toast } from "react-hot-toast";

const RazorpayTest = () => {
  const dispatch = useDispatch();

  const handlePayment = async () => {
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
      const newOrder = await dispatch(createOrder(100)).unwrap(); // Test with a fixed amount

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
    <div style={{ padding: "20px" }}>
      <h1>Razorpay Test</h1>
      <button
        style={{
          backgroundColor: "green",
          color: "white",
          padding: "10px 20px",
          border: "none",
          borderRadius: "5px",
        }}
        onClick={handlePayment}
      >
        Pay with Razorpay
      </button>
    </div>
  );
};

export default RazorpayTest;

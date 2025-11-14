import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { removeFromCart, getCartItems } from "../../features/cartSlice";
import { useNavigate } from "react-router-dom"
import { toast } from "react-hot-toast"
import { FaMoneyBillWave, FaTrash, FaInfoCircle, FaShoppingCart } from "react-icons/fa";






const Cart = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const cartItems = useSelector((state) => state.cart.cartItems)

    useEffect(() => {
        dispatch(getCartItems())
    }, [dispatch])

    const handleRemove = async (item) => {
        try {
            await dispatch(removeFromCart(item.product._id)).unwrap();
            toast.success("Item removed from cart");
        } catch (error) {
            toast.error(error.message || "Failed to remove item");
        }
    }
    const handleDetails = (product) => {
        navigate(`/productDetails/${product._id}`)
    }
    const handleBuy = () => {
        navigate('/checkout')
    }
    const handleBuyAll = () => {
        navigate('/checkout')
    }


    return (
        <div className="bg-gray-100 min-h-screen">
            <div className="container mx-auto py-8">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Your Cart</h1>
                {cartItems && cartItems.length > 0 ? (
                    <div className="space-y-4">
                        {cartItems.map((item) => (
                            item.product ? (
                                <div key={item._id} className="bg-white shadow-lg rounded-lg p-6 flex items-center justify-between">
                                    <div className="flex items-center">
                                        <img
                                            src={item.product.imageUrl}
                                            alt={item.product.name} className="w-24 h-24 object-cover rounded-md mr-6" />
                                        <div>
                                            <h2 className="text-xl font-semibold text-gray-800">{item.product.name}</h2>
                                            <p className="text-gray-600">₹{item.product.price}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-4">
                                        <button onClick={() => handleBuy(item.product)} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded flex items-center justify-center gap-2">
                                            <FaMoneyBillWave /> Buy Now
                                        </button>
                                        <button onClick={() => handleRemove(item)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded flex items-center justify-center gap-2">
                                            <FaTrash /> Remove
                                        </button>
                                        <button onClick={() => handleDetails(item.product)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center justify-center gap-2">
                                            <FaInfoCircle /> View Details
                                        </button>

                                    </div>
                                </div>
                            ) : null
                        ))}
                        <button onClick={handleBuyAll} className="w-full bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 mt-8">
                            <FaShoppingCart /> Buy All
                        </button>
                    </div>
                ) : (
                    <p className="text-center text-gray-600">Your cart is empty.</p>
                )}
            </div>

        </div>
    )
}
export default Cart;



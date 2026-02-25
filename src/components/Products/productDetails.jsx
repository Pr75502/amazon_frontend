import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { productDetails } from "../../features/productSlice";
import { addToCart } from "../../features/cartSlice";
import { toast } from "react-hot-toast";
import Reviews from "./Reviews";
import ReviewForm from "./ReviewForm";
import { FaCartPlus, FaMoneyBillWave } from "react-icons/fa";


const ProductDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const details = useSelector((state) => state.product.details);

    useEffect(() => {
        dispatch(productDetails(id));
    }, [dispatch, id]);

    const handleAddToCart = () => {
        dispatch(addToCart(details));
        toast.success("Item added to cart");
    };

    const handleBuyNow = async () => {
        try {
            await dispatch(addToCart(details)).unwrap();
            navigate('/checkout');
        } catch (error) {
            toast.error(error.message || "Failed to initiate purchase");
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen">
            <div className="container mx-auto py-8">
                {details && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <img
                                src={details.imageUrl}
                                alt={details.name}
                                className="w-full max-h-[500px] object-contain rounded-lg shadow-lg"
                            />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-gray-800 mb-4">
                                {details.name}
                            </h1>
                            <p className="text-2xl font-semibold text-gray-700 mb-4">
                                ₹{details.price}
                            </p>
                            <p className="text-gray-600 mb-8">{details.description}</p>
                            <div className="flex">
                                <button
                                    onClick={handleAddToCart}
                                    className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded flex items-center justify-center gap-2"
                                >
                                    <FaCartPlus /> Add to Cart
                                </button>
                                <button
                                    onClick={handleBuyNow}
                                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded flex items-center justify-center gap-2 ml-2"
                                >
                                    <FaMoneyBillWave /> Buy Now
                                </button>
                            </div>
                        </div>
                    </div>
                )}
                <div className="mt-8">
                    <ReviewForm productId={id} />
                    <Reviews productId={id} />
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
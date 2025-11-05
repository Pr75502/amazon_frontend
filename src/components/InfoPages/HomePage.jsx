import React, { useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../../features/cartSlice';
import { useEffect } from 'react';
import { fetchProducts } from "../../features/productSlice";
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast';

let token = localStorage.getItem("token")




const HomePage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const products = useSelector(state => {
        console.log(state);
        return state.product.products;
    });
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    const handleDetails = (product) => {
        navigate(`/productDetails/${product._id}`);
    }

    const filteredProducts = products ? products.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
    ) : [];

    const handleAddToCart = (product) => {

        if (token) {
            dispatch(addToCart(product));
            toast.success('Item added to cart');
        } else {
            alert('Please log in to continue');
        }
    };


    return (
        <div className="bg-gray-100 min-h-screen">
            <div className="container mx-auto py-8">
                <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
                    Welcome to Amazon Clone
                </h1>

                <div className="mb-8 text-center">
                    <input
                        type="text"
                        placeholder="Search for products..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full max-w-md p-2 border border-gray-300 rounded-lg"
                    />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredProducts &&
                        filteredProducts.map((product) => (
                            <div
                                key={product._id}
                                className="bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 cursor-pointer"
                            //   onClick={() => handleDetails(product)}
                            >
                                <img
                                    src={product.imageUrl}
                                    alt={product.name}
                                    className="w-full h-56 object-cover"
                                />
                                <div className="p-4">
                                    <h2 className="text-lg font-semibold text-gray-800">
                                        {product.name}
                                    </h2>
                                    <p className="text-gray-600 mt-2">₹{product.price}</p>
                                    <button
                                        onClick={() => handleDetails(product)}
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                    >
                                        Details
                                    </button>

                                    <button
                                        onClick={() => handleAddToCart(product)}
                                        className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded"
                                    >
                                        Add to Cart
                                    </button>

                                    <button
                                        onClick={() => {
                                            navigate("/checkout");
                                        }}
                                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                                    >
                                        {" "}
                                        Buy Now
                                    </button>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
};

export default HomePage;

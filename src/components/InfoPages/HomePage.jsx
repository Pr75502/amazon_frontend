import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../../features/cartSlice';
import { fetchProducts } from "../../features/productSlice";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { FaInfoCircle, FaCartPlus, FaMoneyBillWave } from 'react-icons/fa';

let token = localStorage.getItem("token");

const Pagination = ({ productsPerPage, totalProducts, paginate, currentPage }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav className="mt-8">
            <ul className="flex justify-center space-x-2">
                {pageNumbers.map(number => (
                    <li key={number}>
                        <a
                            onClick={() => paginate(number)}
                            href="#!"
                            className={`px-4 py-2 border rounded-lg ${currentPage === number ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}
                        >
                            {number}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

const HomePage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const products = useSelector(state => state.product.products);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(8);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery]);

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

    const handleBuyNow = async (product) => {
        if (token) {
            await dispatch(addToCart(product));
            navigate("/checkout");
        } else {
            alert('Please log in to continue');
        }
    };

   
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

   
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="bg-gray-100 min-h-screen">
            <div className="container mx-auto py-8">
                <div className="bg-gray-900 text-white text-center p-12 rounded-lg mb-8">
                    <h1 className="text-5xl font-extrabold mb-4">Welcome to Amazon Clone</h1>
                    <p className="text-xl">Your one-stop shop for everything</p>
                </div>

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
                    {currentProducts &&
                        currentProducts.map((product) => (
                            <div
                                key={product._id}
                                className="bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 flex flex-col"
                            >
                                <img
                                    src={product.imageUrl}
                                    alt={product.name}
                                    className="w-full h-56 object-cover cursor-pointer"
                                    onClick={() => handleDetails(product)}
                                />
                                <div className="p-4 flex flex-col flex-grow">
                                    <h2 className="text-lg font-semibold text-gray-800">
                                        {product.name}
                                    </h2>
                                    <p className="text-gray-600 mt-2 mb-4">₹{product.price}</p>
                                    <div className="mt-auto flex flex-col gap-2">
                                        <button
                                            onClick={() => handleDetails(product)}
                                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center justify-center gap-2"
                                        >
                                            <FaInfoCircle /> Details
                                        </button>

                                        <button
                                            onClick={() => handleAddToCart(product)}
                                            className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded flex items-center justify-center gap-2"
                                        >
                                            <FaCartPlus /> Add to Cart
                                        </button>

                                        <button
                                            onClick={() => handleBuyNow(product)}
                                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded flex items-center justify-center gap-2"
                                        >
                                            <FaMoneyBillWave /> Buy Now
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
                <Pagination
                    productsPerPage={productsPerPage}
                    totalProducts={filteredProducts.length}
                    paginate={paginate}
                    currentPage={currentPage}
                />
            </div>
        </div>
    );
};

export default HomePage;

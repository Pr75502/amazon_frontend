import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { searchProducts } from '../../features/productSlice';

const SearchResults = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const { products, error } = useSelector((state) => state.product);

    const query = new URLSearchParams(location.search).get('query');

    useEffect(() => {
        if (query) {
            dispatch(searchProducts(query));
        }
    }, [dispatch, query]);

    return (
        <div className="bg-gray-100 min-h-screen">
            <div className="container mx-auto py-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-8">Search Results for "{query}"</h1>
                {error && <p className="text-red-500">{error}</p>}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {products && products.length > 0 ? (
                        products.map((product) => (
                            <div key={product._id} className="bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
                                <img src={product.imageUrl} alt={product.name} className="w-full h-56 object-cover" />
                                <div className="p-4">
                                    <h2 className="text-lg font-semibold text-gray-800">{product.name}</h2>
                                    <p className="text-gray-600 mt-2">₹{product.price}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-600 col-span-full">No products found.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SearchResults;

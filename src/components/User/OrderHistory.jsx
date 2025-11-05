import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getOrders } from '../../features/orderSlice';

const OrderHistory = () => {
    const dispatch = useDispatch();
    const { orders, error } = useSelector((state) => state.order);

    useEffect(() => {
        dispatch(getOrders());
    }, [dispatch]);

    return (
        <div className="bg-gray-100 min-h-screen">
            <div className="container mx-auto py-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-8">Your Orders</h1>
                {error && <p className="text-red-500">{error}</p>}
                {orders && orders.length > 0 ? (
                    <div className="space-y-4">
                        {orders.map((order) => (
                            <div key={order._id} className="bg-white shadow-lg rounded-lg p-6">
                                <div className="flex justify-between items-center mb-4">
                                    <div>
                                        <h2 className="text-xl font-semibold text-gray-800">Order ID: {order._id}</h2>
                                        <p className="text-gray-600">Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                                    </div>
                                    <p className="text-lg font-bold text-gray-800">Total: ₹{order.totalAmount}</p>
                                </div>
                                <div>
                                    {order.items.map((item) => (
                                        item.product && (
                                            <div key={item.product._id} className="flex items-center py-2 border-b last:border-b-0">
                                                <img src={item.product.imageUrl} alt={item.product.name} className="w-20 h-20 object-cover rounded-md mr-4" />
                                                <div>
                                                    <h3 className="font-semibold text-gray-800">{item.product.name}</h3>
                                                    <p className="text-gray-600">Quantity: {item.quantity}</p>
                                                </div>
                                            </div>
                                        )
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-600">You have no orders.</p>
                )}
            </div>
        </div>
    );
};

export default OrderHistory;

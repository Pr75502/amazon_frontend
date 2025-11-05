import React from 'react';

const AboutUs = () => {
    return (
        <div className="bg-gray-100 py-8">
            <div className="container mx-auto px-4">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">About Us</h1>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <p className="text-gray-700 leading-relaxed mb-4">
                        Welcome to Amazon Clone! We are dedicated to providing you with the best online shopping experience.
                        Our platform aims to replicate the seamless functionality and vast selection of products you'd expect from a leading e-commerce giant.
                    </p>
                    <p className="text-gray-700 leading-relaxed mb-4">
                        Our mission is to offer a user-friendly interface, secure transactions, and a diverse range of products
                        to meet all your needs. We believe in continuous improvement and are always working to enhance our services.
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                        Thank you for choosing Amazon Clone. Happy shopping!
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;

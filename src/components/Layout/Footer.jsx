import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-8">
            <div className="container mx-auto text-center">
                <p className="text-sm">&copy; 2025 Amazon Clone. All rights reserved.</p>
                <div className="mt-4 flex justify-center space-x-4">
                    <Link to="/about-us" className="text-gray-400 hover:text-white">About Us</Link>
                    <Link to="/contact-us" className="text-gray-400 hover:text-white">Contact Us</Link>
                    <Link to="/faq" className="text-gray-400 hover:text-white">FAQ</Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

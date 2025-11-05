import React from 'react';

const ContactUs = () => {
    return (
        <div className="bg-gray-100 py-8">
            <div className="container mx-auto px-4">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">Contact Us</h1>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <p className="text-gray-700 leading-relaxed mb-4">
                        Have questions, feedback, or need assistance? We're here to help!
                        You can reach out to our support team through the following methods:
                    </p>
                    <ul className="list-disc list-inside text-gray-700 mb-4">
                        <li>Email: support@amazonclone.com</li>
                        <li>Phone: +1 (555) 123-4567</li>
                        <li>Address: 123 Clone Street, E-commerce City, EC 12345</li>
                    </ul>
                    <p className="text-gray-700 leading-relaxed">
                        Our customer service hours are Monday to Friday, 9:00 AM to 5:00 PM (EST).
                        We look forward to hearing from you!
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;

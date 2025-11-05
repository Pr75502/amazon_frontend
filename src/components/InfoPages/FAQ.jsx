import React from 'react';

const FAQ = () => {
    const faqs = [
        {
            question: "What is Amazon Clone?",
            answer: "Amazon Clone is an e-commerce platform designed to mimic the functionalities and user experience of a leading online retail store."
        },
        {
            question: "How do I place an order?",
            answer: "To place an order, browse our products, add desired items to your cart, and proceed to checkout. Follow the steps to provide shipping and payment information."
        },
        {
            question: "What payment methods do you accept?",
            answer: "We accept various payment methods, including credit/debit cards and other online payment options. Specific options will be displayed at checkout."
        },
        {
            question: "How can I track my order?",
            answer: "Once your order is shipped, you will receive a tracking number via email. You can use this number on our 'Your Orders' page to track your shipment."
        },
        {
            question: "What is your return policy?",
            answer: "Our return policy allows returns within 30 days of purchase for most items. Please refer to our detailed return policy page for more information."
        }
    ];

    return (
        <div className="bg-gray-100 py-8">
            <div className="container mx-auto px-4">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">Frequently Asked Questions</h1>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    {faqs.map((faq, index) => (
                        <div key={index} className="mb-4 pb-4 border-b last:border-b-0">
                            <h2 className="text-xl font-semibold text-gray-800 mb-2">{faq.question}</h2>
                            <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FAQ;

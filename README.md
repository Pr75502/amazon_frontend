# Amazon Clone - Frontend

This is the frontend for a full-stack e-commerce application, inspired by Amazon. It is built with React and utilizes a variety of modern web development tools.

## Features

*   **User Authentication:** Secure login and sign-up functionality.
*   **Product Management:** Browse, search, and view detailed product information.
*   **Shopping Cart:** Add products to a cart and manage them before checkout.
*   **Checkout Process:** A seamless checkout process with payment integration.
*   **Payment Integration:** Supports payments via Razorpay.
*   **User Profiles:** View order history and manage user information.
*   **Admin Dashboard:** A protected area for administrators to manage products, orders, and users.
*   **Product Reviews:** Users can submit and view reviews for products.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

*   Node.js (v18.x or higher)
*   npm (v9.x or higher)

### Installation

1.  Clone the repository:
    ```sh
    git clone https://your-repository-url.git
    ```
2.  Navigate to the project directory:
    ```sh
    cd frontend
    ```
3.  Install the dependencies:
    ```sh
    npm install
    ```

## Available Scripts

In the project directory, you can run:

*   `npm run dev`: Runs the app in the development mode. Open [http://localhost:5173](http://localhost:5173) to view it in the browser.
*   `npm run build`: Builds the app for production to the `dist` folder.
*   `npm run lint`: Lints the project files using ESLint.
*   `npm run preview`: Serves the production build locally.

## Key Dependencies

*   **React:** A JavaScript library for building user interfaces.
*   **React Router:** For declarative routing in your application.
*   **Redux Toolkit:** For efficient state management.
*   **Axios:** A promise-based HTTP client for making requests to the backend.
*   **Tailwind CSS:** A utility-first CSS framework for rapid UI development.
*   **Razorpay:** For integrating payments.
*   **Vite:** A fast build tool and development server.

## Project Structure
```
src
├── api
├── app
├── components
│   ├── admin
│   ├── Auth
│   ├── CartAndCheckout
│   ├── InfoPages
│   ├── Layout
│   ├── myOrders
│   ├── Products
│   └── User
├── features
└── ...
```
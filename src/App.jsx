
import "./App.css";

import AddProduct from "./components/Products/addProduct.jsx";
import SignUp from "./components/Auth/signUp";
import { Toaster } from "react-hot-toast";
import Login from "./components/Auth/login";
import Cart from "./components/CartAndCheckout/cart";
import Checkout from "./components/CartAndCheckout/checkout";
import ProductDetails from "./components/Products/productDetails";
import Profile from "./components/User/profile";

import HomePage from "./components/InfoPages/HomePage";
import SearchResults from "./components/Products/SearchResults";
import OrderHistory from "./components/User/OrderHistory";
import AboutUs from "./components/InfoPages/AboutUs";
import ContactUs from "./components/InfoPages/ContactUs";
import FAQ from "./components/InfoPages/FAQ";
import Footer from "./components/Layout/Footer";
import Navbar from "./components/Layout/navbar";
import OpenSetting from "./components/Layout/openSetting";
import Setting from "./components/Layout/setting";

import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Toaster />
      <Navbar />
      <main>
        <Routes>
          <Route path="/setting" element={<Setting />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/homepage" element={<HomePage />} />

          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/productDetails/:id" element={<ProductDetails />} />

          <Route path="/search" element={<SearchResults />} />
          <Route path="/orders" element={<OrderHistory />} />
          <Route path="/addproduct" element={<AddProduct />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/openSetting" element={<OpenSetting />} />

          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/faq" element={<FAQ />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;


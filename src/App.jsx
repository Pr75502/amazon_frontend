
import "./App.css";

import AddProductUser from "./components/Products/addProductUser.jsx";
import SignUp from "./components/Auth/signUp";
import { Toaster } from "react-hot-toast";
import Login from "./components/Auth/login";
import Cart from "./components/CartAndCheckout/cart";
import Checkout from "./components/CartAndCheckout/checkout";
import ProductDetails from "./components/Products/productDetails";
import Profile from "./components/User/profile";

import HomePage from "./components/InfoPages/HomePage";
import SearchResults from "./components/Products/SearchResults";
import EditProductUser from "./components/Products/EditProductUser.jsx";
import RazorpayTest from "./components/RazorpayTest";
import OrderHistory from "./components/User/OrderHistory";
import AboutUs from "./components/InfoPages/AboutUs";
import ContactUs from "./components/InfoPages/ContactUs";
import FAQ from "./components/InfoPages/FAQ";
import Footer from "./components/Layout/Footer";
import Navbar from "./components/Layout/navbar";
import OpenSetting from "./components/Layout/openSettingModal.jsx";
import Setting from "./components/Layout/setting";

import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchById } from "./features/userSlice";


import ProtectedAdmin from "./components/admin/protected_admin.jsx";
import AdminLogin from "./components/admin/login.jsx";
import AdminDashboard from "./components/admin/dashboard.jsx";
import NotAuthorized from "./components/admin/not-authorised.jsx";
import AdminLayout from "./components/admin/layout.jsx";
import AdminProducts from "./components/admin/createProducts.jsx";
import AddProduct from "./components/admin/AddProduct.jsx";
import EditProduct from "./components/admin/EditProduct.jsx";
import AdminUsers from "./components/admin/Users.jsx";
import AdminOrders from "./components/admin/Orders.jsx";
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchById());
  }, [dispatch]);

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
          <Route path="/addproduct" element={<AddProductUser />} />
          <Route path="/edit-product/:id" element={<EditProductUser />} />
          <Route path="/razorpay-test" element={<RazorpayTest />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/openSetting" element={<OpenSetting />} />

          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/faq" element={<FAQ />} />

          <Route path={"/admin/login"} element={<AdminLogin />} />
          <Route path={"/admin/not-authorized"} element={<NotAuthorized />} />
          <Route
            path={"/admin"}
            element={
              <ProtectedAdmin>
                <AdminLayout />
              </ProtectedAdmin>
            }
          >
            <Route path={"/admin/dashboard"} element={<AdminDashboard />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="products/add" element={<AddProduct />} />
            <Route path="products/edit/:id" element={<EditProduct />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="orders" element={<AdminOrders />} />
          </Route>
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;


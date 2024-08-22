import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { Toaster } from "react-hot-toast";

import "./index.css";

// Context Providers
import Cart from "./context/Cart.jsx";

// Components
import Protect from "./components/Protect.jsx";

// Routes
import Root from "./routes/root/Root.jsx";
import ErrorPage from "./ErrorPage.jsx";
import Home from "./routes/home/Home.jsx";
import LoginPage from "./routes/auth/LoginPage.jsx";
import Signup from "./routes/auth/Signup.jsx";
import AccountPage from "./routes/account/AccountPage.jsx";
import ProductsPage from "./routes/products/ProductsPage.jsx";
import ProductInfo from "./routes/products/ProductInfo.jsx";
import CategoriesPage from "./routes/categories/CategoriesPage.jsx";
import CategoryProductsPage from "./routes/categories/CategoryProductsPage.jsx";
import CartPage from "./routes/cart/CartPage.jsx";
import SearchPage from "./routes/search/SearchPage.jsx";
import OrderPage from "./routes/order/OrderPage.jsx";
import AdminDashboard from "./routes/admin/pages/AdminDashboard.jsx";
import Products from "./routes/admin/pages/Products.jsx";
import Categories from "./routes/admin/pages/Categories.jsx";
import Orders from "./routes/admin/pages/Orders.jsx";
import Settings from "./routes/admin/pages/Settings.jsx";
import Users from "./routes/admin/pages/Users.jsx";
import DashboardLayout from "./routes/admin/UI/DashboardLayout.jsx";

const queryClient = new QueryClient();

// Render the application
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Cart>
      <QueryClientProvider client={queryClient}>
        <Toaster
          position="top-center"
          gutter={12}
          containerStyle={{ margin: "8px" }}
          toastOptions={{
            success: { duration: 3000 },
            error: { duration: 5000 },
            style: {
              fontSize: "16px",
              maxWidth: "500px",
              padding: "16px 24px",
            },
          }}
        />
        <BrowserRouter>
          <Routes>
            {/* User Routes */}
            <Route
              path="/"
              element={
                <Protect>
                  <Root />
                </Protect>
              }
            >
              <Route index element={<Home />} />
              <Route path="/account" element={<AccountPage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/categories" element={<CategoriesPage />} />
              <Route
                path="/categories/:categoryId"
                element={<CategoryProductsPage />}
              />
              <Route path="/products/:productId" element={<ProductInfo />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/order" element={<OrderPage />} />
            </Route>
            {/* Admin Routes */}
            <Route path="/admin" element={<DashboardLayout />}>
              <Route
                path="/admin"
                element={<Navigate replace to={"/admin/dashboard"} />}
              />
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="products" element={<Products />} />
              <Route path="categories" element={<Categories />} />
              <Route path="orders" element={<Orders />} />
              <Route path="users" element={<Users />} />
              <Route path="settings" element={<Settings />} />
            </Route>
            {/* Authentication Routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<Signup />} />
            {/* Error Route */}
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </Cart>
  </React.StrictMode>
);

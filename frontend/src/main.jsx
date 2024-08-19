import ReactDOM from "react-dom/client";
import Root from "./routes/root/Root.jsx";
import { Toaster } from "react-hot-toast";

import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./ErrorPage.jsx";
import Home from "./routes/home/Home.jsx";
import { QueryClient, QueryClientProvider } from "react-query";
import LoginPage from "./routes/auth/LoginPage.jsx";
import Signup from "./routes/auth/Signup.jsx";
import Protect from "./components/Protect.jsx";
import AccountPage from "./routes/account/AccountPage.jsx";
import ProductsPage from "./routes/products/ProductsPage.jsx";
import ProductInfo from "./routes/products/ProductInfo.jsx";
import CategoriesPage from "./routes/categories/CategoriesPage.jsx";
import CategoryProductsPage from "./routes/categories/CategoryProductsPage.jsx";
import Cart from "./context/Cart.jsx";
import CartPage from "./routes/cart/CartPage.jsx";
import SearchPage from "./routes/search/SearchPage.jsx";
import OrderPage from "./routes/order/OrderPage.jsx";
import React from "react";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Protect>
        <Root />
      </Protect>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: (
          <Protect>
            <Home />
          </Protect>
        ),
      },
      {
        path: "/account",
        element: (
          <Protect>
            <AccountPage />
          </Protect>
        ),
      },
      {
        path: "/products",
        element: (
          <Protect>
            <ProductsPage />
          </Protect>
        ),
      },
      {
        path: "/categories",
        element: (
          <Protect>
            <CategoriesPage />
          </Protect>
        ),
      },
      {
        path: "/categories/:categoryId",
        element: (
          <Protect>
            <CategoryProductsPage />
          </Protect>
        ),
      },
      {
        path: "/products/:productId",
        element: (
          <Protect>
            <ProductInfo />
          </Protect>
        ),
      },
      {
        path: "/cart",
        element: (
          <Protect>
            <CartPage />
          </Protect>
        ),
      },
      {
        path: "/search",
        element: <SearchPage />,
      },
      {
        path: "/order",
        element: <OrderPage />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
]);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Cart>
      <QueryClientProvider client={queryClient}>
        <Toaster
          position="top-center"
          gutter={12}
          containerStyle={{ margin: "8px" }}
          toastOptions={{
            success: {
              duration: 3000,
            },
            error: {
              duration: 5000,
            },
            style: {
              fontSize: "16px",
              maxWidth: "500px",
              padding: "16px 24px",
            },
          }}
        />
        <RouterProvider router={router} />
      </QueryClientProvider>
    </Cart>
  </React.StrictMode>
);

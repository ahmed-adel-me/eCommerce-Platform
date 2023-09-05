import React from "react";
import ReactDOM from "react-dom/client";
import Root from "./routes/root/Root.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./ErrorPage.jsx";
import Home from "./routes/home/Home.jsx";
import { QueryClient, QueryClientProvider } from "react-query";
import LoginPage from "./routes/auth/LoginPage.jsx";
import Signup from "./routes/auth/Signup.jsx";
import Auth from "./context/Auth.jsx";
import Protect from "./components/Protect.jsx";
import AccountPage from "./routes/account/AccountPage.jsx";
import ProductsPage from "./routes/products/ProductsPage.jsx";
import ProductInfo from "./routes/products/ProductInfo.jsx";
import CategoriesPage from "./routes/categories/CategoriesPage.jsx";
import CategoryProductsPage from "./routes/categories/CategoryProductsPage.jsx";
import WishList from "./routes/account/WishList.jsx";
import OrderList from "./routes/account/OrderList.jsx";
import { ReactQueryDevtools } from "react-query/devtools";
import Cart from "./context/Cart.jsx";
import CartPage from "./routes/cart/CartPage.jsx";
import SearchPage from "./routes/search/SearchPage.jsx";
import Cookies from "js-cookie";
import OrderPage from "./routes/order/OrderPage.jsx";

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

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      onError: (error) => {
        if (error.name === "AxiosError") {
          if (error.response.status === 401) {
            Cookies.remove("jwt");
            location.reload();
          }
        }
      },
    },
  },
});
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Auth>
      <Cart>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </Cart>
    </Auth>
  </React.StrictMode>
);

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
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/home",
        element: (
          <Protect>
            <Home />
          </Protect>
        ),
      },
      {
        path: "/account",
        element: (
          // <Protect>
          <AccountPage />
          // </Protect>
        ),
      },
      {
        path: "/products",
        element: (
          // <Protect>
          <ProductsPage />
          // </Protect>
        ),
      },
      {
        path: "/products/:productId",
        element: <ProductInfo />,
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
    <Auth>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </Auth>
  </React.StrictMode>
);

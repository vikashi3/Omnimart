import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import CategoryPage from "./pages/CategoryPage.jsx";
import App from "./App.jsx";
import "./index.css";
import Contact from "./pages/Contact.jsx";
import AboutUs from "./pages/AboutUs.jsx";
import HomePage from "./pages/HomePage.jsx";
import SubCategory from "./component/SubCategory.jsx";
import SignIn from "./pages/SignIn.jsx";
import SignUp from "./pages/SignUp.jsx";
import BusinessCard from "./component/BusinessCard.jsx";
import store from "./component/store.js";
import { Provider } from "react-redux";
import Profile from "./pages/Profile.jsx";
import { ToastContainer } from 'react-toastify';
import ProductsList from "./component/ProductsList.jsx";
import Cart from './pages/Cart.jsx'
import ProductDetails from "./component/ProductDetails.jsx";
import Payment from "./pages/Payment.jsx";
import MyProducts from "./component/MyProducts.jsx";
import MyFavorites from "./component/MyFavorites.jsx";
import AdminSignIn from "./admin/AdminSignIn.jsx"
import AdminHome from "./admin/AdminHome.jsx"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/aboutUs",
        element: <AboutUs />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/category/:id",
        element: <SubCategory />,
      },
      {
        path: "/:category/:subcategory",
        element: <ProductsList />,
      },
      {
        path: "/product/:id",
        element: <ProductDetails />
      },
      {
        path: "/businessCard",
        element: <BusinessCard />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/payment",
        element: <Payment />,
      },
      {
        path:"/myfavorites",
        element: <MyFavorites />
      },
      {
        path:"/myproducts",
        element: <MyProducts />
      }
    ],
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/signin",
    element: <SignIn />,
  },
  {
    path: "/adminSignin",
    element: <AdminSignIn />,
  },
  {
    path: "/adminHome",
    element: <AdminHome />,
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <ToastContainer
        position="bottom-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);

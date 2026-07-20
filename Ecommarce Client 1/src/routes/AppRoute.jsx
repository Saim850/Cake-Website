import { createBrowserRouter } from "react-router-dom";

// Layouts
import MainLayout from "../layouts/MainLayout";

// Public Pages
import HomePage from "../pages/HomePage";
import Cakes from "../components/Cakes";
import About from "../components/About";
import Cart from "../components/Cart";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SingupPage";
import ProfilePage from "../pages/ProfilePage";
import Contact from "../components/Contact";
import EditProfile from "../components/User/EditProfile";
import ResetPasswordPage from "../pages/ResetPasswordPage"
import ResetPasswordConfirmPage from "../pages/ResetPasswordConfirmPage";

// Admin Pages
import AdminLayout from "../layouts/AdminLayout";
import AdminProduct from "../components/AdminDashbord/AdminProduct";
import AdminOrders from "../components/AdminDashbord/AdminOrders";
import AdminCustomers from "../components/AdminDashbord/AdminCustomers";
import EditProduct from "../components/AdminDashbord/EditProduct";
import AddProduct from "../components/AdminDashbord/AddProduct";
import Checkout from "../components/Checkout";
import ShippingAddress from "../components/User/ShippingAddress";
import Profile from "../components/User/Profile";
import AdminCategory from "../components/AdminDashbord/AdminCategory";
import AdminOrderDetails from "../components/AdminDashbord/AdminOrderDetails";

export const router = createBrowserRouter([
  // Public Routes
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "cakes",
        element: <Cakes />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "sign-up",
        element: <SignupPage />,
      },
      {
        path:"profile",
        element:<Profile />
      },
      {
        path: "profile-page",
        element: <ProfilePage />,
      },
      {
        path: "edit-profile",
        element: <EditProfile />,
      },
      {
        path:"reset-password",
        element:<ResetPasswordPage />
      },
      {
        path:"reset-password-confirm/:uid/:token",
        element:<ResetPasswordConfirmPage />
      },
      {
        path:"checkout",
        element:<Checkout />
      },
      {
        path:"shipping-address",
        element:<ShippingAddress />
      }
    ],
  },

  // Admin Routes
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        path: "orders",
        element: <AdminOrders />
      },
      {
        path: "order/:id/",
        element: <AdminOrderDetails />
      },
      {
        path: "products",
        element: <AdminProduct />,
      },
      {
        path:"customers",
        element:<AdminCustomers />
      }, 
      {
        path:"category",
        element:<AdminCategory />
      },
      {
        path:"edit-product/:id/",
        element:<EditProduct />
      },
      {
        path:"add-product/",
        element:<AddProduct />
      }
    ],
  },
]);
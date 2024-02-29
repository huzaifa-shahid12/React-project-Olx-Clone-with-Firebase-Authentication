import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Card from "../screen/Card/Card";
// import App from "../App";
import Dashboard from "../dashboard/Dashboard";
import Carddetails from "../screen/CardDetails/Carddetails";
import Login from "../screen/login/Login";
import Register from "../screen/signup/Register";
import Sell from "../screen/sell/Sell";
import PostDetail from "../screen/PostDetail/PostDetail";
import AddToCart from "../screen/AddToCart/Cart";
// import { useNavigate } from "react-router-dom";
// import { useState, useEffect } from "react";
// import { Navbar } from "react-bootstrap";
// import CardDetails from "../screen/CardDetails/CardDetails";
// import CardApi from "../screen/CardData/CardApi";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "/Carddetails/:id",
    element: <Carddetails />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/postAd",
    element: <Sell />,
  },
  {
    path: "/postdetail",
    element: <PostDetail />,
  },
  {
    path: "/addtocart",
    element: <AddToCart />,
  },
]);

function Router() {
  return <RouterProvider router={router} />;
}

export default Router;

// function user() {
//   const navigate = useNavigate();
//   const [user, setUser] = useState();

//   useEffect(() => {
//     onAuthStateChanged(auth, (user) => {
//       setUser(user);
//     });
//   }, []);

//   useEffect(() => {
//     const { pathname } = window.location;

//     if (user) {
//       if (pathname === "/login" || pathname === "/register") {
//         navigate("/");
//       } else {
//         if (pathname === "/postAds") {
//           navigate("/login");
//         }
//       }
//     }
//   }, [window.location.pathname.user]);
//   return(
//     <></>
//   )
// }

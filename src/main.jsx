import React from "react";
import ReactDOM from "react-dom/client";
import {
  Route,
  RouterProvider,
  createRoutesFromElements,
  createBrowserRouter,
} from "react-router-dom";
import "./index.css";
import Layout from "./components/Layout/Layout.jsx";
import Home from "./components/Navigation/Home/index.jsx";
import About from "./components/About/About.jsx";
import Contact from "./components/Navigation/Contact/index.jsx";
import Auctions from "./components/Auctions/Auctions.jsx";
import Login from "./components/Navigation/Login/Login.jsx";
import Register from "./components/Navigation/Register/Register.jsx";
import Item from "./components/Listings/Listings.jsx";
import Profile from "./components/Profile/Profile.jsx";
import Create from "./components/Create/createListing.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="/home" element={<Home />} />

      <Route path="/about" element={<About />} />

      <Route path="/contact" element={<Contact />} />

      <Route path="/auctions" element={<Auctions />} />

      <Route path="/listings/">
        <Route path="/listings/:itemId" element={<Item />} />
      </Route>

      <Route path="/create" element={<Create />} />
      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />
      <Route path="/profile" element={<Profile />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

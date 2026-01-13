import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Products from "./pages/Products";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Orders from "./pages/Orders";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Pets from "./pages/Pets";

import { ActivePetProvider } from "./context/ActivePetContext";

function App() {
  return (
    <ActivePetProvider>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/pet/:petType" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />

        <Route path="/favorites" element={<Favorites />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/pets" element={<Pets />} />
      </Routes>
    </ActivePetProvider>
  );
}

export default App;

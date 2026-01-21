import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";

import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import Profile from "./pages/Profile";
import Pets from "./pages/Pets";
import Login from "./pages/Login";
import Register from "./pages/Register";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ErrorPage from "./pages/ErrorPage";
import Forum from "./pages/Forum";
import ScrollToTop from "./components/ScrollToTop";

import { ActivePetProvider } from "./context/ActivePetContext";
import { CartProvider } from "./context/CartContext";

import OrderConfirmation from "./pages/OrderConfirmation";

function App() {
  return (
    <ActivePetProvider>
      <CartProvider>
        <div className="app-shell">
          <Navbar />

          <main className="app-main">
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<Home />} />

              <Route path="/products" element={<Products />} />
              <Route path="/products/pet/:petType" element={<Products />} />
              <Route path="/products/:id" element={<ProductDetails />} />

              <Route path="/cart" element={<Cart />} />
              <Route path="/orders" element={<Orders />} />
              <Route
                path="/orders/confirmation/:orderId"
                element={<OrderConfirmation />}
              />
              <Route path="/pets" element={<Pets />} />
              <Route path="/profile" element={<Profile />} />

              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              <Route path="/forum" element={<Forum />} />

              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />

              {/* 👇 Catch-all route (404) */}
              <Route path="*" element={<ErrorPage />} />
            </Routes>
          </main>
        </div>
      </CartProvider>
    </ActivePetProvider>
  );
}

export default App;

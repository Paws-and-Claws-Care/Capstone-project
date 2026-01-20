import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname, search } = useLocation();

  useEffect(() => {
    // If we're returning to the products list, let Products.jsx restore scroll
    if (pathname === "/products" || pathname.startsWith("/products/pet/"))
      return;

    window.scrollTo(0, 0);
  }, [pathname, search]);

  return null;
}

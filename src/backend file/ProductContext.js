// ProductContext.js
import { createContext, useEffect, useState } from "react";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [productsData, setProductsData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then(res => res.json())
      .then(data => setProductsData(data))
      .catch(err => console.error("Error fetching products:", err));
  }, []);

  return (
    <ProductContext.Provider value={{ productsData, setProductsData }}>
      {children}
    </ProductContext.Provider>
  );
};

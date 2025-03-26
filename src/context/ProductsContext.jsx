import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/config";

const ProductContext = createContext();

function ProductsProvider({ children }) {
  const [products, setproducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setproducts(await api.get("/products"));
      } catch (error) {
        console.log(error);
      }
    };
    fetchProducts();
  }, []);
  return (
    <ProductContext.Provider value={products}>
      {children}
    </ProductContext.Provider>
  );
}

const useProducts = () => {
  const products = useContext(ProductContext);
  return products;
};
const useDetailProduct = (id) => {
  const products = useContext(ProductContext);
  const detailProduct = products.find((item) => item.id === id);
  return detailProduct
};

export default ProductsProvider;
export { useProducts,useDetailProduct };

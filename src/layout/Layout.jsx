import { Link } from "react-router-dom";

import { PiShoppingCartSimpleBold } from "react-icons/pi";
import { useCart } from "../context/Cartcontext";
import styles from "./Layout.module.css";

function Layout({ children }) {
  const [state] = useCart();
  return (
    <>
      <header className={styles.header}>
        <Link to="/products">Shop</Link>
        <div>
          <Link to="/checkout">
            <PiShoppingCartSimpleBold />
            {!!state.itemsCounter && <span>{state.itemsCounter}</span>}
          </Link>
        </div>
      </header>
      {children}
      <footer className={styles.footer}>Footer</footer>
    </>
  );
}

export default Layout;

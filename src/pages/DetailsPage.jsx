import { Link, useParams } from "react-router-dom";
import { useDetailProduct } from "../context/ProductsContext";
import Loader from "../components/Loader";
import { SiOpenproject } from "react-icons/si";
import { IoMdPricetag } from "react-icons/io";
import { FaArrowLeft } from "react-icons/fa";
import styles from "./DetailsPage.module.css";

function DetailsPage() {
  const { id } = useParams();
  const detailsProducts = useDetailProduct(+id);

  if (!detailsProducts) return <Loader />;
  return (
    <div className={styles.container}>
      <img src={detailsProducts.image} alt={detailsProducts.title} />
      <div className={styles.information}>
        <h3 className={styles.title}>{detailsProducts.title}</h3>
        <p className={styles.description}>{detailsProducts.description}</p>
        <p className={styles.category}>
          <SiOpenproject />
          {detailsProducts.category}
        </p>
        <div>
          <span className={styles.price}>
            <IoMdPricetag />
            {detailsProducts.price} $
          </span>
          <Link to="/products">
            <FaArrowLeft />
            <span>Back to Shop</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default DetailsPage;

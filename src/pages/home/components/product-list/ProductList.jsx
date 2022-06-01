import cn from "classnames";
import { useSelector } from "react-redux";
import ProductItem from "@home/components/product-item/ProductItem";
import styles from "@home/components/product-list/product-list.module";

function ProductList({ className }) {
  const productList = useSelector((state) => state.productList);
  return (
    <div className={cn(styles.productList, className)}>
      {productList.map((item) => (
        <ProductItem key={item.sku} {...item} />
      ))}
    </div>
  );
}

export default ProductList;

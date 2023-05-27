import ProductCardList from "../components/ProductCardList/ProductCardList";
import { useFetchData } from "../hooks/useFetch";

const ProductPage = () => {
  useFetchData();

  return <ProductCardList />;
};

export default ProductPage;

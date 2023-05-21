import { useState } from "react";
import ProductCardList from "../components/ProductCardList/ProductCardList";
import { useFetchData } from "../hooks/useFetch";
import LoadingPage from "./LoadingPage";

const ProductPage = () => {
  const [isLoading, setIsLoading] = useState(true);

  const handleIsLoading = () => {
    setIsLoading(false);
  };

  useFetchData(handleIsLoading);

  return <>{isLoading ? <LoadingPage /> : <ProductCardList />}</>;
};

export default ProductPage;

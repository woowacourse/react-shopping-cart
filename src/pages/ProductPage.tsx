import { useState } from "react";
import ProductCardList from "../components/ProductCardList/ProductCardList";
import { useFetchData } from "../hooks/useFetch";
import LoadingPage from "./LoadingPage";
import { useRecoilValue } from "recoil";
import { errorAtom } from "../store/errorState";
import ErrorPage from "./ErrorPage";

const ProductPage = () => {
  const error = useRecoilValue(errorAtom);

  const [isLoading, setIsLoading] = useState(true);
  const handleIsLoading = () => {
    setIsLoading(false);
  };

  useFetchData(handleIsLoading);

  return (
    <>
      {error.isError ? (
        <ErrorPage />
      ) : isLoading ? (
        <LoadingPage />
      ) : (
        <ProductCardList />
      )}
    </>
  );
};

export default ProductPage;

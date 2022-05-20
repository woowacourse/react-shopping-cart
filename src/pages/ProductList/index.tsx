import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { loadProductsAPI, ProductState, selectProductState } from "../../redux/modules/products";

import Product from "../../components/Product";
import Loader from "../../components/@shared/Loader";

import * as S from "./styles";

function ProductList() {
  const dispatch = useDispatch();

  const { productList, loading, error }: ProductState = useSelector(selectProductState);

  useEffect(() => {
    dispatch(loadProductsAPI());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      alert(error.message);
    }
  }, [error]);

  if (loading) {
    return <Loader />;
  }

  return (
    <S.ProductsWrapper>
      {productList.map((product) => (
        <Product key={product.id} productInfo={product} />
      ))}
    </S.ProductsWrapper>
  );
}

export default ProductList;

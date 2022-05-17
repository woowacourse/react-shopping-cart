import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import * as Styled from "./styles";

import Product from "../../components/Product";
import Loader from "../../components/@shared/Loader";

import { loadProductsAPI, ProductState, selectProductState } from "../../redux/modules/products";

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
    <Styled.ProductsWrapper>
      {productList.map((product) => (
        <Product key={product.id} productInfo={product} />
      ))}
    </Styled.ProductsWrapper>
  );
}

export default ProductList;

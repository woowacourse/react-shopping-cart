import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as Styled from "./styles";

import Product from "../../components/Product";
import { loadProductsAPI, ProductState, selectProductState } from "../../redux/modules/products";
import Loader from "../../components/@shared/Loader";

function ProductList() {
  const { productList, loading, error }: ProductState = useSelector(selectProductState);
  const dispatch = useDispatch();

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
    <>
      <Styled.ProductsWrapper>
        {productList.map((product) => (
          <Product key={product.id} productInfo={product} />
        ))}
      </Styled.ProductsWrapper>
    </>
  );
}

export default ProductList;

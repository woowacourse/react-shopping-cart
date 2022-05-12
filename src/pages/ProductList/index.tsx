import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as Styled from "./styles";

import Product from "../../components/Product";
import { loadProductsAPI, ProductState, selectProductState } from "../../redux/modules/products";

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

  return (
    <>
      <Styled.ProductsWrapper>
        {loading
          ? "로딩 중..."
          : productList.map((product) => <Product key={product.id} productInfo={product} />)}
      </Styled.ProductsWrapper>
    </>
  );
}

export default ProductList;

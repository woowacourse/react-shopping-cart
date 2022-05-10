import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../component/ProductCard/ProductCard";
import {
  selectCurrentProducts,
  selectProductsError,
  selectProductsLoading,
} from "../redux/products/products.selector";
import { useEffect } from "react";
import { fetchProductsStart } from "../redux/products/products.action";

const GridContainer = styled.div`
  display: grid;
  width: 70%;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 22px;
  justify-content: center;
`;

function ProductListPage() {
  const dispatch = useDispatch();
  const loading = useSelector(selectProductsLoading);
  const products = useSelector(selectCurrentProducts);
  const error = useSelector(selectProductsError);

  useEffect(() => {
    dispatch(fetchProductsStart());
  }, [dispatch]);

  return (
    <GridContainer>
      {loading ? (
        <div>로딩중입니다</div>
      ) : (
        products.map(({ id, name, image, price }) => (
          <ProductCard key={id} name={name} thumbnail={image} price={price} />
        ))
      )}
    </GridContainer>
  );
}

export default ProductListPage;

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCarts } from "../../store/modules/cartSlice";
import { getProducts } from "../../store/modules/productSlice";
import Loading from "../@shared/Loading/Loading";
import Product from "./Product/Product";
import * as S from "./ProductsList.styled";

const ProductsList = () => {
  const dispatch = useDispatch();
  const { products, loading, errorMessage } = useSelector(
    (state) => state.product
  );

  // TODO : getCarts를 nav나 app으로 빼두기
  useEffect(() => {
    dispatch(getProducts());
    dispatch(getCarts());
  }, [dispatch]);

  useEffect(() => {
    if (errorMessage) {
      // eslint-disable-next-line no-alert
      window.alert(errorMessage);
    }
  }, [errorMessage]);

  return (
    <>
      {loading && <Loading>상품목록을 불러오는 중입니다</Loading>}
      <S.ProductsList>
        {products.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </S.ProductsList>
    </>
  );
};

export default ProductsList;

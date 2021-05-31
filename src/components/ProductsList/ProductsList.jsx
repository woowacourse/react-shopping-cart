import React, { useEffect } from "react";
import { useProduct } from "../../hooks/useProduct";
import { useCart } from "../../hooks/useCart";

import Loading from "../@shared/Loading/Loading";
import Product from "./Product/Product";
import * as S from "./ProductsList.styled";

const ProductsList = () => {
  const { products, loading, errorMessage } = useProduct();
  const { addCart, getCartAmount } = useCart();

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
          <Product
            key={product.id}
            product={product}
            amount={getCartAmount(product.id)}
            addToCart={() => addCart(product)}
          />
        ))}
      </S.ProductsList>
    </>
  );
};

export default ProductsList;

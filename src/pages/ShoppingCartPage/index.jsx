import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PaymentAmount from "../../components/PaymentAmount";
import ShoppingCartProducts from "../../components/ShoppingCartProducts";
import {
  addIds,
  getShoppingCartProducts,
  removeCartProducts,
  removeIds,
} from "../../modules/products";
import * as S from "./index.styles";

const ShoppingCartPage = () => {
  const [isAllChecked, setAllChecked] = useState(true);
  const checkedProductIds = useSelector((state) => state.checkedProductIds);
  const shoppingCartProducts = useSelector(
    (state) => state.shoppingCartProducts
  );
  const dispatch = useDispatch();

  const handleAllChecked = () => {
    if (isAllChecked) {
      dispatch(removeIds());
    } else {
      const ids = shoppingCartProducts.data.map((product) => product.id);
      dispatch(addIds(ids));
    }
    setAllChecked((prevState) => !prevState);
  };

  const handleRemoveProducts = () => {
    dispatch(removeCartProducts());
  };

  useEffect(() => {
    const allChecked =
      shoppingCartProducts.data.length === checkedProductIds.length;

    setAllChecked(allChecked);
  }, [shoppingCartProducts, checkedProductIds]);

  useEffect(() => {
    dispatch(getShoppingCartProducts());
  }, [dispatch]);

  return (
    <section>
      <S.ShoppingCartTitle>장바구니</S.ShoppingCartTitle>
      <S.ShoppingCartPaymentContainer>
        <ShoppingCartProducts
          handleAllChecked={handleAllChecked}
          isAllChecked={isAllChecked}
          checkedProductIds={checkedProductIds}
          products={shoppingCartProducts.data}
          handleRemoveProducts={handleRemoveProducts}
        />
        <PaymentAmount
          products={shoppingCartProducts.data}
          checkedProductIds={checkedProductIds}
        />
      </S.ShoppingCartPaymentContainer>
    </section>
  );
};

export default ShoppingCartPage;

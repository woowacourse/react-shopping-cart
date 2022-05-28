import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ShoppingCartOrder from "../../components/ShoppingCart/\bShoppingCartOrder";
import ShoppingCartProductsContainer from "../../components/ShoppingCart/ShoppingCartProductsContainer";
import {
  getShoppingCartProducts,
  removeCartProducts,
} from "../../modules/cartProducts";
import { addIds, removeIds } from "../../modules/checkedIds";
import { setSnackBarTypeFail } from "../../modules/snackBar";
import * as S from "./index.styles";

const ShoppingCartPage = () => {
  const [isAllChecked, setAllChecked] = useState(true);
  const checkedProductIds = useSelector((state) => state.checkedProductIds);
  const shoppingCartProducts = useSelector(
    (state) => state.shoppingCartProducts
  );
  const dispatch = useDispatch();

  const handleAllCheckedClick = () => {
    if (isAllChecked) {
      dispatch(removeIds());
    } else {
      const ids = shoppingCartProducts.data.map((product) => product.id);
      dispatch(addIds(ids));
    }
    setAllChecked((prevState) => !prevState);
  };

  const handleRemoveAllItemClick = () => {
    dispatch(removeCartProducts(setSnackBarTypeFail));
    dispatch(removeIds());
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
        <ShoppingCartProductsContainer
          onAllCheckedClick={handleAllCheckedClick}
          isAllChecked={isAllChecked}
          checkedProductIds={checkedProductIds}
          products={shoppingCartProducts.data}
          onRemoveAllItemClick={handleRemoveAllItemClick}
        />
        <ShoppingCartOrder
          products={shoppingCartProducts.data}
          checkedProductIds={checkedProductIds}
        />
      </S.ShoppingCartPaymentContainer>
    </section>
  );
};

export default ShoppingCartPage;

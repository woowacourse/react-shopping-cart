import { useSelector } from "react-redux";
import React from "react";

import { ShoppingCartButtonBox } from "./ShoppingCartButton.style";

import { selectDetailProduct } from "redux/products/products.selector";
import { selectCurrentCarts } from "redux/carts/carts.selector";
import { isInCart } from "util/check";
import useClickCartButton from "hooks/useClickCartButton";
import { CURRENT_USER } from "constants";

const ShoppingCartButton = ({ idx }: { idx: number }) => {
  const product = useSelector(selectDetailProduct);
  const carts = useSelector(selectCurrentCarts);
  const { handleAddProduct, handleDeleteProduct } = useClickCartButton();

  const isCartItem = isInCart(idx, carts);
  const handleShoppingCartButtonClick = (e: React.MouseEvent) => {
    if (product === null) {
      return;
    }
    isCartItem
      ? handleDeleteProduct(e, `${CURRENT_USER}${idx}`)
      : handleAddProduct(e, {
          name: product.name,
          price: product.price,
          id: idx,
          thumbnail: product.thumbnail,
        });
  };

  return (
    <ShoppingCartButtonBox
      isincart={isCartItem}
      onClick={handleShoppingCartButtonClick}
    >
      {isCartItem ? "장바구니에서 제거" : "장바구니에 추가"}
    </ShoppingCartButtonBox>
  );
};

export default ShoppingCartButton;

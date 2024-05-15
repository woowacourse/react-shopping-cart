/** @jsxImportSource @emotion/react */

import Checkbox from "../../../../../Button/Checkbox/Checkbox";
import DeleteButton from "../../../../../Button/DeleteButton/DeleteButton";

import {
  CartItemContainerStyle,
  CartItemDetailControlsStyle,
  CartItemImageStyle,
  CartItemInfoStyle,
  CartItemNameStyle,
  CartItemPriceStyle,
  CartItemQuantityContainerStyle,
  CartItemQuantityStyle,
} from "./CartItem.style";
import QuantityButton from "../../../../../Button/QuantityButton/QuantityButton";
import Divider from "../../../../../Divider/Divider";
import { useRecoilState, useSetRecoilState } from "recoil";
import { itemQuantityState } from "../../../../../../store/atom/cartItemQuantity";
import { useEffect } from "react";
import { itemEachCheckState, itemIdsState } from "../../../../../../store/atom/cartItemCheck";
import { API_TOKEN } from "../../../../../../store/utils";

interface CartItemProps {
  CartItemInfo: CartItemInfo;
}

const CartItem = ({ CartItemInfo }: CartItemProps) => {
  const { product, id: cartId } = CartItemInfo;
  const [quantity, setQuantity] = useRecoilState(itemQuantityState(product.id));
  const [isCheck, setIsCheck] = useRecoilState(itemEachCheckState(cartId));
  const setItemIds = useSetRecoilState(itemIdsState);

  useEffect(() => {
    setQuantity(CartItemInfo.quantity);
  }, [CartItemInfo.quantity, setQuantity]);

  const handleCheckBoxClick = () => {
    setIsCheck(!isCheck);
  };

  const handleDeleteButtonClick = () => {
    setItemIds((prev) => {
      const index = prev.findIndex((value) => value === cartId);
      const arr = [...prev];
      return [...arr.slice(0, index), ...arr.slice(index + 1)];
    });

    (async () => {
      await fetch(import.meta.env.VITE_API_BASE_URL + `/cart-items/${cartId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json", Authorization: API_TOKEN },
      });
    })();

    //TODO: Route refresh
  };

  const handleMinusButtonClick = () => {};

  const handlePlusButtonClick = () => {};

  return (
    <div css={CartItemContainerStyle}>
      <Divider />
      <div css={CartItemDetailControlsStyle}>
        <Checkbox isCheck={isCheck} onClick={handleCheckBoxClick} />
        <DeleteButton onClick={handleDeleteButtonClick} />
      </div>
      <div css={CartItemInfoStyle}>
        <div>
          <img src={CartItemInfo.product.imageUrl} css={CartItemImageStyle} />
        </div>
        <div>
          <div css={CartItemNameStyle}>{CartItemInfo.product.name}</div>
          <div css={CartItemPriceStyle}>{CartItemInfo.product.price.toLocaleString() + "원"}</div>
          <div css={CartItemQuantityContainerStyle}>
            <QuantityButton onClick={handleMinusButtonClick} type={"minus"} />
            <div css={CartItemQuantityStyle}>{quantity}</div>
            <QuantityButton onClick={handlePlusButtonClick} type={"plus"} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;

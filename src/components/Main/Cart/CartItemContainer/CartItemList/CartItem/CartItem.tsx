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
import { useCallback, useEffect } from "react";
import { itemEachCheckState, itemIdsState, itemQuantityState } from "../../../../../../store/atom/atoms";
import { changeProductAmount, deleteProduct } from "../../../../../../store/api";

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

  const deleteProductId = useCallback(() => {
    setItemIds((prev) => {
      const index = prev.findIndex((value) => value === cartId);
      const arr = [...prev];
      console.log(prev);
      return [...arr.slice(0, index), ...arr.slice(index + 1)];
    });
  }, [cartId, setItemIds]);

  const handleDeleteButtonClick = () => {
    deleteProductId();
    deleteProduct(cartId);
    //TODO: Route refresh
  };

  const handleMinusButtonClick = () => {
    changeProductAmount({ type: "minus", quantity, cartId });
    if (quantity === 1) {
      deleteProductId();
      deleteProduct(cartId);
      return;
    }

    setQuantity((prev) => prev - 1);
  };

  const handlePlusButtonClick = () => {
    changeProductAmount({ type: "plus", quantity, cartId });
    setQuantity((prev) => prev + 1);
  };

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

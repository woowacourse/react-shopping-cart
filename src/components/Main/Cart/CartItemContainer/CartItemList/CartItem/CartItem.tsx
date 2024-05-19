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
import { useCallback } from "react";
import { cartState, itemEachCheckState, itemIdsState, itemQuantityState } from "../../../../../../store/atom/atoms";
import { changeProductAmount, deleteProduct } from "../../../../../../store/api";

import { deleteCheck } from "../../../../../../store/localStorage/localStorage";

interface CartItemProps {
  CartItemInfo: CartItemInfo;
}

const CartItem = ({ CartItemInfo }: CartItemProps) => {
  const { id } = CartItemInfo;
  const [quantity, setQuantity] = useRecoilState(itemQuantityState);
  const [isCheck, setIsCheck] = useRecoilState(itemEachCheckState(id));
  const setItemIds = useSetRecoilState(itemIdsState);
  const setCartState = useSetRecoilState(cartState);

  const handleCheckBoxClick = () => {
    setIsCheck(!isCheck);
  };

  const deleteProductId = useCallback(() => {
    setItemIds((prev) => {
      const index = prev.findIndex((value) => value === id);
      const arr = [...prev];
      return [...arr.slice(0, index), ...arr.slice(index + 1)];
    });
  }, [id, setItemIds]);

  const executeDeleteProduct = () => {
    deleteProductId();
    deleteProduct(id);
    deleteCheck(id);
    setCartState((prev) => {
      const temp = JSON.parse(JSON.stringify(prev));
      return temp.filter((item: CartItemInfo) => item.id !== id);
    });
  };

  const handleDeleteButtonClick = () => {
    executeDeleteProduct();
  };

  const handleMinusButtonClick = () => {
    changeProductAmount({ quantity: quantity[id] - 1, id });
    if (quantity[id] === 1) {
      executeDeleteProduct();
      return;
    }

    setQuantity((prev) => ({ ...prev, [id]: prev[id] - 1 }));
  };

  const handlePlusButtonClick = () => {
    changeProductAmount({ quantity: quantity[id] + 1, id });
    setQuantity((prev) => ({ ...prev, [id]: prev[id] + 1 }));
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
            <div css={CartItemQuantityStyle}>{quantity[id]}</div>
            <QuantityButton onClick={handlePlusButtonClick} type={"plus"} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;

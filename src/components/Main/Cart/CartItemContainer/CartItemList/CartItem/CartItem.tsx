import { useRecoilState, useSetRecoilState } from "recoil";
import { useCallback } from "react";

import { cartState, itemEachCheckState, itemQuantityState } from "@/store/atom/atoms";
import { changeProductAmount, deleteProduct } from "@/api";
import { deleteCheck } from "@/store/localStorage/localStorage";

import Checkbox from "@/components/Button/Checkbox/Checkbox";
import DeleteButton from "@/components/Button/DeleteButton/DeleteButton";
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
import QuantityButton from "@/components/Button/QuantityButton/QuantityButton";
import Divider from "@/components/Divider/Divider";

interface CartItemProps {
  CartItemInfo: CartItemInfo;
}

const CartItem = ({ CartItemInfo: { id, product } }: CartItemProps) => {
  const [quantity, setQuantity] = useRecoilState(itemQuantityState);
  const [isCheck, setIsCheck] = useRecoilState(itemEachCheckState(id));
  const setCartState = useSetRecoilState(cartState);

  const handleCheckBoxClick = () => {
    setIsCheck(!isCheck);
  };

  const deleteProductId = useCallback(() => {
    setCartState((prev) => {
      const index = prev.findIndex((item) => item.id === id);
      const arr = [...prev];
      return [...arr.slice(0, index), ...arr.slice(index + 1)];
    });
  }, [id, setCartState]);

  const executeDeleteProduct = () => {
    deleteProductId();
    deleteProduct(id);
    deleteCheck(id);
    setCartState((prev) => {
      const temp = JSON.parse(JSON.stringify(prev));
      return temp.filter((item: CartItemInfo) => item.id !== id);
    });
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
        <DeleteButton onClick={executeDeleteProduct} />
      </div>
      <div css={CartItemInfoStyle}>
        <div>
          <img src={product.imageUrl} css={CartItemImageStyle} />
        </div>
        <div>
          <div css={CartItemNameStyle}>{product.name}</div>
          <div css={CartItemPriceStyle}>{product.price.toLocaleString() + "원"}</div>
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

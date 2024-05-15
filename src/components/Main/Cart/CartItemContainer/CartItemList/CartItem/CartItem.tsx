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
import { useRecoilState } from "recoil";
import { itemQuantityState } from "../../../../../../store/selector/cartItemQuantity";

interface CartItemProps {
  CartItemInfo: CartItemInfo;
}

const CartItem = ({ CartItemInfo }: CartItemProps) => {
  const { product } = CartItemInfo;
  const [state, setState] = useRecoilState(itemQuantityState(product.id));

  if (!state) {
    setState(CartItemInfo.quantity);
  }

  return (
    <div css={CartItemContainerStyle}>
      <Divider />
      <div css={CartItemDetailControlsStyle}>
        <Checkbox />
        <DeleteButton />
      </div>
      <div css={CartItemInfoStyle}>
        <div>
          <img src={CartItemInfo.product.imageUrl} css={CartItemImageStyle} />
        </div>
        <div>
          <div css={CartItemNameStyle}>{CartItemInfo.product.name}</div>
          <div css={CartItemPriceStyle}>{CartItemInfo.product.price.toLocaleString() + "원"}</div>
          <div css={CartItemQuantityContainerStyle}>
            <QuantityButton type={"minus"} />
            <div css={CartItemQuantityStyle}>{state}</div>
            <QuantityButton type={"plus"} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;

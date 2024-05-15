/** @jsxImportSource @emotion/react */

import Checkbox from "../../../../../Button/Checkbox/Checkbox";
import DeleteButton from "../../../../../Button/DeleteButton/DeleteButton";

import DummyImage from "../../../../../../assets/image.png";
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
import QuantityButton, { ButtonType } from "../../../../../Button/QuantityButton/QuantityButton";

const CartItem = () => {
  return (
    <div css={CartItemContainerStyle}>
      <div css={CartItemDetailControlsStyle}>
        <Checkbox />
        <DeleteButton />
      </div>
      <div css={CartItemInfoStyle}>
        <div>
          <img src={DummyImage} css={CartItemImageStyle} />
        </div>
        <div>
          <div css={CartItemNameStyle}>상품 이름</div>
          <div css={CartItemPriceStyle}>상품 가격</div>
          <div css={CartItemQuantityContainerStyle}>
            <QuantityButton type={ButtonType.Minus} />
            <div css={CartItemQuantityStyle}>0</div>
            <QuantityButton type={ButtonType.Plus} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;

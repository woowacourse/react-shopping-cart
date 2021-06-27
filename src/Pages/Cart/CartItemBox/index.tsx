import React, { useState, ChangeEventHandler, ChangeEvent, MouseEvent, MouseEventHandler } from "react";

import { ProductImage, CheckBox } from "../../../Components";
import { CART_ITEM_MAX_COUNT, CART_ITEM_MIN_COUNT } from "../../../constants/attrValues";
import { Li, ProductImageLink, Desc, NameLink, ControlBox, Counter, Svg } from "./style";

interface CartItemBoxProps {
  id: number;
  name: string;
  price: number;
  quantity: number;
  imageSrc: string;
  isChecked: boolean;
  onChangeQuantity: ChangeEventHandler<HTMLInputElement>;
  onIncrementOrderCount: MouseEventHandler<HTMLButtonElement>;
  onDecrementOrderCount: MouseEventHandler<HTMLButtonElement>;
  onChangeChecked: ChangeEventHandler<HTMLInputElement>;
  onClickDeleteButton: MouseEventHandler<HTMLButtonElement>;
}

const CartItemBox = ({
  id,
  name,
  price,
  quantity,
  imageSrc,
  isChecked,
  onChangeQuantity,
  onIncrementOrderCount,
  onDecrementOrderCount,
  onChangeChecked,
  onClickDeleteButton,
}: CartItemBoxProps) => (
  <Li>
    <CheckBox checked={isChecked} onChange={onChangeChecked} />
    <ProductImageLink to={`/cart/${id}`}>
      <ProductImage size="7.75rem" src={imageSrc} aria-label={`${name}이미지`} />
    </ProductImageLink>
    <Desc>
      <NameLink to={`/cart/${id}`}>{name}</NameLink>
    </Desc>
    <ControlBox>
      <button type="button" onClick={onClickDeleteButton}>
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
          <path
            d="M8.4 10L8.4 17M13.4 10V17M4.88636 4V2.68775C4.88636 2.24685 5.0589 1.82345 5.36706 1.50813C5.68461 1.18318 6.11977 1 6.57412 1H14.9259C15.3802 1 15.8154 1.18318 16.1329 1.50813C16.4411 1.82345 16.6136 2.24685 16.6136 2.68775V4M21.5 4.9H0M2.5 7V18.5451C2.5 19.1593 2.73024 19.7512 3.14527 20.2039C3.61025 20.7112 4.26679 21 4.95493 21H16.5451C17.2332 21 17.8897 20.7112 18.3547 20.2039C18.7698 19.7512 19 19.1593 19 18.5451V7"
            stroke="#BBBBBB"
            strokeWidth="1.8"
          />
        </svg>
      </button>
      <Counter>
        <input 
          type="number" 
          value={quantity} 
          onChange={onChangeQuantity} 
          min={CART_ITEM_MIN_COUNT} 
          max={CART_ITEM_MAX_COUNT} 
        />
        <div>
          <button type="button" onClick={onIncrementOrderCount}>
            <Svg viewBox="0 0 10 10">
              <path d="M 4 6, L 5,4 L 6,6"></path>
            </Svg>
          </button>
          <button type="button" onClick={onDecrementOrderCount}>
            <Svg viewBox="0 0 10 10">
              <path d="M 4 4, L 5,6 L 6,4"></path>
            </Svg>
          </button>
        </div>
      </Counter>
      <div>{price.toLocaleString("ko-KR")}원</div>
    </ControlBox>
  </Li>
);

export default CartItemBox;
export { CartItemBoxProps };

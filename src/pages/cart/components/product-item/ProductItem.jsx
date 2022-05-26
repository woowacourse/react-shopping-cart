import React from "react";

import { css } from "@emotion/react";

import { useDispatch } from "react-redux";
import {
  toggleCartItemCheckButton,
  incrementCartItemQuantity,
  decrementCartItemQuantity,
  removeRowCartItem,
} from "@/redux/modules/cartList";

import TrashIcon from "@/assets/images/trash.svg";
import StyledCartContainer from "@/pages/cart/components/product-item/ProductItem.styled";
import StyledHr from "@/pages/cart/components/product-item/hr.styled";

import Checkbox from "@/components/checkbox/Checkbox";

function ProductItem({ item }) {
  const { id, name, price, imgUrl, quantity, checked } = item;
  const dispatch = useDispatch();

  const handleChange = () => {
    dispatch(toggleCartItemCheckButton(id));
  };

  const handleIncrementClick = () => {
    dispatch(incrementCartItemQuantity(id));
  };

  const handleDecrementClick = () => {
    dispatch(decrementCartItemQuantity(id));
  };

  const handleRemoveIconClick = () => {
    dispatch(removeRowCartItem(id));
  };

  return (
    <>
      <StyledCartContainer>
        <div className="product-item__left">
          <Checkbox onChange={handleChange} checked={checked} />
          <img src={imgUrl} alt={name} />
          <span className="cart-name">{name}</span>
        </div>
        <div className="product-item__right">
          <TrashIcon
            onClick={handleRemoveIconClick}
            css={css`
              cursor: pointer;
            `}
          />
          <div className="number-input-container">
            <input
              type="number"
              className="number-input"
              value={quantity}
              onChange={(e) => e}
            />
            <div>
              <button
                onClick={handleIncrementClick}
                type="button"
                className="number-input-button"
              >
                ▲
              </button>
              <button
                onClick={handleDecrementClick}
                type="button"
                className="number-input-button"
              >
                ▼
              </button>
            </div>
          </div>
          <span className="cart-price">
            {(price * quantity).toLocaleString("ko-KR")}원
          </span>
        </div>
      </StyledCartContainer>
      <StyledHr />
    </>
  );
}

export default ProductItem;

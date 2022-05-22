import React from "react";

import { css } from "@emotion/react";
import { useDispatch } from "react-redux";
import { toggleCartItemCheckButton } from "@/redux/actions";
import TrashIcon from "@/assets/images/trash.svg";
import StyledCartContainer from "@/pages/cart/components/product-item/ProductItem.styled";

function ProductItem({ item }) {
  const { id, name, price, imgUrl, quantity, checked } = item;
  console.log(item);
  const dispatch = useDispatch();

  const handleChange = () => {
    dispatch(toggleCartItemCheckButton(id));
  };

  return (
    <>
      <StyledCartContainer>
        <div className="product-item__left">
          <input
            onChange={handleChange}
            className="checkbox"
            name="checkbox"
            type="checkbox"
            checked={checked}
          />
          <img src={imgUrl} alt={name} />
          <span className="cart-name">{name}</span>
        </div>
        <div className="product-item__right">
          <TrashIcon
            css={css`
              cursor: pointer;
            `}
          />
          <div className="number-input-container">
            <input type="number" className="number-input" value={quantity} />
            <div>
              <button type="button" className="number-input-button">
                ▲
              </button>
              <button type="button" className="number-input-button">
                ▼
              </button>
            </div>
          </div>
          <span className="cart-price">{price.toLocaleString("ko-KR")}원</span>
        </div>
      </StyledCartContainer>
      <hr css={hrStyle} />
    </>
  );
}

const hrStyle = css`
  width: 100%;
  border: 1px solid #aaaaaa;
  margin-top: 10px;
`;

export default ProductItem;

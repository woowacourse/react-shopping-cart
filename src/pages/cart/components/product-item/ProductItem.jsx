import React from "react";

import { css } from "@emotion/react";
import TrashIcon from "@/assets/images/trash.svg";
import StyledCartContainer from "@/pages/cart/components/product-item/ProductItem.styled";

function ProductItem() {
  return (
    <>
      <StyledCartContainer>
        <div className="product-item__left">
          <input className="checkbox" name="checkbox" type="checkbox" checked />
          <img
            src="https://dummyimage.com/150x150/0bd949/fff&text=dummy"
            alt="PET보틀-정사각(420ml)"
          />
          <span className="cart-name">PET보틀-정사각(420ml)</span>
        </div>
        <div className="product-item__right">
          <TrashIcon
            css={css`
              cursor: pointer;
            `}
          />
          <div className="number-input-container">
            <input type="number" className="number-input" value="1" />
            <div>
              <button type="button" className="number-input-button">
                ▲
              </button>
              <button type="button" className="number-input-button">
                ▼
              </button>
            </div>
          </div>
          <span className="cart-price">123,456원</span>
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

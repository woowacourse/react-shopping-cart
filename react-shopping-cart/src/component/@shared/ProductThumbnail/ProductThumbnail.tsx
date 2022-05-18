import styled, { css, StyledType } from "styled-components";

const ProductThumbnail = styled.img<StyledType>`
  ${({ type }) => {
    switch (type) {
      case "card":
        return css`
          width: 188px;
          height: 188px;
        `;
      case "detail":
        return css`
          width: 380px;
          height: 380px;
        `;
      case "shoppingCart":
        return css`
          width: 98px;
          height: 98px;
        `;
      case "orderItem":
        return css`
          width: 80px;
          height: 80px;
        `;
      default:
        return;
    }
  }}
`;

export default ProductThumbnail;

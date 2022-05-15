import styled, { css } from "styled-components";

const ProductThumbnail = styled.img`
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
      default:
        return;
    }
  }}
`;

export default ProductThumbnail;

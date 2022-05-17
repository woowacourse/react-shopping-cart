import styled, { css } from 'styled-components';

const ProductPrice = styled.div`
  ${({ type }) => {
    switch (type) {
      case 'card':
        return css`
          font-size: 14px;
        `;
      case 'detail':
        return css`
          font-size: 21px;
        `;
      case 'shoppingCart':
        return css`
          font-size: 12px;
        `;
      default:
        return;
    }
  }}
`;

export default ProductPrice;

import styled, { css } from 'styled-components';

const ProductName = styled.div`
  ${({ type }) => {
    switch (type) {
      case 'card':
        return css`
          font-size: 12px;
        `;
      case 'detail':
        return css`
          margin-right: auto;
          font-size: 21px;
          font-weight: 700;
        `;
      case 'shoppingCart':
        return css`
          font-size: 13px;
        `;
      default:
        return;
    }
  }}
`;

export default ProductName;

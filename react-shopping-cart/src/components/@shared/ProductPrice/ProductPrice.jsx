import styled, { css } from 'styled-components';

// 재사용O
function ProductPrice({ children, ...props }) {
  return <Styled.Root {...props}>{children}</Styled.Root>;
}

const Styled = {
  Root: styled.div`
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
  `,
};

export default ProductPrice;

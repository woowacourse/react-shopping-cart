import styled from 'styled-components';

const ProductStyled = styled.div(
  ({ theme }) => `
    width: ${theme.productWidth};
    margin: ${theme.productMargin};
  `,
);

export default ProductStyled;

import styled from 'styled-components';

const ProductListStyled = styled.div(
  ({ theme }) => `
  height: calc(100% - ${theme.headerHeight});
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  padding: 5.5vh 14vw 0;
  overflow-y: auto;
  @media (max-width: 1300px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`,
);

export default ProductListStyled;

import styled from 'styled-components';

const ExpectedPriceBoxStyled = styled.div`
  position: relative;
  width: 448px;
  height: 318px;
  border: 1px solid #ddd;
  padding: 30px;

  button {
    position: absolute;
    bottom: 30px;
  }
`;

const OrderButtonStyled = styled.button(
  ({ theme }) => `
  background: ${theme.mainColor};
  font-size: 24px;
  color: #fff;
  width: 388px;
  height: 73px;
  border: none;
  cursor: pointer;
`,
);

export { ExpectedPriceBoxStyled, OrderButtonStyled };

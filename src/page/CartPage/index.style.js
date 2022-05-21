import styled from 'styled-components';

const Styled = {
  CartPage: styled.main`
    width: 1269px;
    background-color: ${({ theme }) => theme.colors.white};
    margin-top: 140px;
    padding: 40px;
    overflow: scroll;
    height: 100%;

    -ms-overflow-style: none;
    &::-webkit-scrollbar {
      display: none;
    }
  `,
};

export default Styled;

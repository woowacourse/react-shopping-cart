import styled from 'styled-components';

const Styled = {
  ProductListPage: styled.main`
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

  ProductList: styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 47px;
  `,

  Loading: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
  `,
};

export default Styled;

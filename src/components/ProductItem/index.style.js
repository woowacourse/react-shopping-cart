import styled, { css } from 'styled-components';

const Styled = {
  ProductItem: styled.div`
    width: 282px;
    position: relative;
    cursor: pointer;
  `,

  ProductContainer: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 75px;
    padding: 0 15px;
  `,

  ProductText: styled.p`
    font-weight: 400;
    letter-spacing: 0.5px;

    ${({ name }) =>
      name &&
      css`
        font-size: 16px;
        line-height: 22px;
      `}

    ${({ price }) =>
      price &&
      css`
        font-size: 20px;
        line-height: 27px;
      `}
  `,

  QuantityContainer: styled.div`
    background-color: ${({ theme }) => theme.colors.mint};
    width: 50px;
    height: 50px;
    border-radius: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    color: white;
  `,

  CartContainer: styled.div`
    width: 100px;
    display: flex;
    justify-content: end;
  `,
};

export default Styled;

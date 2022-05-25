import styled from 'styled-components';

const Styled = {
  Container: styled.div`
    width: 282px;
    position: relative;
    cursor: pointer;
  `,

  ProductController: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 75px;
    padding-left: 15px;
  `,

  ProductName: styled.p`
    font-weight: 400;
    letter-spacing: 0.5px;
    font-size: 16px;
    line-height: 22px;
  `,

  ProductPrice: styled.p`
    font-weight: 400;
    letter-spacing: 0.5px;
    font-size: 20px;
    line-height: 27px;
  `,

  Quantity: styled.div`
    background-color: ${({ theme }) => theme.colors.mint_001};
    width: 50px;
    height: 50px;
    border-radius: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    color: ${({ theme }) => theme.colors.white};
  `,

  CartController: styled.div`
    width: 100px;
    height: 100%;
    display: flex;
    justify-content: end;
    align-items: center;
    padding-right: 15px;
  `,
};

export default Styled;

import styled, { css } from 'styled-components';

const Styled = {
  ProductItem: styled.div`
    width: 282px;
    position: relative;
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
    color: var(--product-text-color);

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
    background-color: var(--primary-color);
    width: 50px;
    height: 50px;
    border-radius: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
  `,
};

export default Styled;

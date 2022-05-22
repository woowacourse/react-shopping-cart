import styled from 'styled-components';
import { Button } from 'components';

const Styled = {
  Container: styled.main`
    display: flex;
    justify-content: center;
    align-items: center;
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

  ProductContainer: styled.div`
    display: flex;
    flex-direction: column;
    width: 638px;
    align-items: center;
  `,

  ProductName: styled.p`
    width: inherit;
    box-sizing: border-box;
    padding: 0 30px;

    font-weight: 700;
    font-size: 32px;
    line-height: 36px;
    letter-spacing: 0.5px;
    margin-top: 21px;
  `,

  Division: styled.hr`
    width: 640px;
    height: 1px;
    background-color: black;
    margin: 33px 0;
  `,

  PriceContainer: styled.div`
    width: inherit;
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    padding: 0 30px;
  `,

  PriceTag: styled.p`
    font-weight: 400;
    font-size: 24px;
    line-height: 24px;
    letter-spacing: 0.5px;
  `,

  ProductPrice: styled.p`
    font-weight: 400;
    font-size: 32px;
    line-height: 27px;
    letter-spacing: 0.5px;
  `,

  PutCartButton: styled(Button)`
    color: ${({ theme }) => theme.colors.white};
    background-color: ${({ theme }) => theme.colors.brown};
    width: 638px;
    height: 98px;
    font-weight: 700;
    font-size: 32px;
    line-height: 21px;
    margin-top: 57px;
  `,
};

export default Styled;

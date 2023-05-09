import styled from 'styled-components';
import { LogoIcon } from '../../assets/ShoppingCartIcon';
import { selector, useRecoilValue } from 'recoil';
import { cartListState } from '../../App';

const cartAmountState = selector<number>({
  key: 'cartAmountState',
  get: ({ get }) => {
    const list = get(cartListState);

    return list.length;
  },
});

export const Header = () => {
  const cartAmount = useRecoilValue(cartAmountState);

  return (
    <Style.Container>
      <Style.ContentWrapper>
        <Style.LogoContainer>
          {LogoIcon}
          <Style.Logo>배민문방구</Style.Logo>
        </Style.LogoContainer>
        <Style.CartContainer>
          <Style.Cart>장바구니</Style.Cart>
          <Style.CartAmount>{cartAmount}</Style.CartAmount>
        </Style.CartContainer>
      </Style.ContentWrapper>
    </Style.Container>
  );
};

const Style = {
  Container: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    height: 80px;
    width: 100vw;

    background-color: #333333;

    margin-bottom: 61px;
  `,
  ContentWrapper: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    width: 1341px;
  `,
  LogoContainer: styled.div`
    display: flex;

    gap: 26px;
  `,
  Logo: styled.h1`
    margin: 0;
    padding: 0;

    font-size: 40px;
    font-weight: 900;

    color: white;
  `,
  CartContainer: styled.div`
    display: flex;

    gap: 10px;
  `,
  Cart: styled.h1`
    margin: 0;
    padding: 0;

    font-size: 24px;
    font-weight: 900;

    color: white;
  `,
  CartAmount: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    width: 26px;
    height: 26px;
    border-radius: 26px;

    background-color: #04c09e;
    color: white;
    font-size: 16px;
  `,
};

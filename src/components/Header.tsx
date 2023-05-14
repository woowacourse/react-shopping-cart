import { styled } from 'styled-components';
import { CartLogo } from '../assets/svg';
import { Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { productsInCartState } from '../recoil/atoms';

export default function Header() {
  const [productsInCart] = useRecoilState(productsInCartState);

  return (
    <Style.Container>
      <Style.Content>
        <Style.Title to="/">
          <CartLogo fill="var(--grey-100)" style={{ width: '40px' }} />
        </Style.Title>
        <Style.CartLink to="/">
          <Style.CountInCart>{productsInCart.length}</Style.CountInCart>
        </Style.CartLink>
      </Style.Content>
    </Style.Container>
  );
}

const Style = {
  Container: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    width: 100%;
    min-width: 992px;
    height: 80px;

    position: fixed;
    top: 0;
    left: 0;
    background-color: var(--grey-500);

    color: var(--grey-100);

    z-index: 1000;

    /* 태블릿 */
    @media screen and (max-width: 991px) {
      min-width: 768px;
    }

    /* 모바일 */
    @media screen and (max-width: 767px) {
      min-width: 375px;
    }
  `,

  Content: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    width: 932px;

    /* 태블릿 */
    @media screen and (max-width: 991px) {
      width: 708px;
    }

    /* 모바일 */
    @media screen and (max-width: 767px) {
      width: 315px;
    }
  `,

  Title: styled(Link)`
    display: flex;
    align-items: center;

    font-size: 32px;
    font-weight: 900;

    &::after {
      content: 'SHOP';
      padding-left: 12px;
    }
  `,

  CartLink: styled(Link)`
    display: flex;
    align-items: center;

    font-weight: 500;

    &::before {
      content: '장바구니';
      padding-right: 6px;
    }
  `,

  CountInCart: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    width: 30px;
    height: 30px;

    border-radius: 50%;

    background-color: #04c09e;
  `,
};

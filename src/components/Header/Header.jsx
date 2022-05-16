import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { CART_SIZE, COLOR, PATH } from '../../constants';
import { ReactComponent as CartIcon } from '../shared/CartIcon.svg';
import { UnstyledButton } from '../shared/styles';

function Header() {
  return (
    <header>
      <Styled.Nav>
        <Styled.NavTitleWrapper>
          <Link to={PATH.ROOT}>
            <CartIcon
              width={CART_SIZE.LARGE.WIDTH}
              height={CART_SIZE.LARGE.HEIGHT}
              fill={COLOR.WHITE}
            />
            <Styled.NavTitle>WOOWA SHOP</Styled.NavTitle>
          </Link>
        </Styled.NavTitleWrapper>
        <Styled.NavButtonWrapper>
          <Link to={PATH.CARTS}>
            <Styled.NavButton type="button">장바구니</Styled.NavButton>
          </Link>
          <Link to={PATH.ORDERS}>
            <Styled.NavButton type="button">주문목록</Styled.NavButton>
          </Link>
        </Styled.NavButtonWrapper>
      </Styled.Nav>
    </header>
  );
}

export default Header;

const Styled = {
  Nav: styled.nav`
    display: flex;
    justify-content: space-around;
    width: 100%;
    height: 80px;

    background: #2ac1bc;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.3);
  `,
  NavTitleWrapper: styled.div`
    display: flex;
    align-items: center;
  `,
  NavTitle: styled.h1`
    display: inline;
    font-size: 40px;
    font-weight: 900;

    color: #ffffff;
    margin-left: 15px;
  `,

  NavButtonWrapper: styled.div`
    display: flex;
    align-items: center;
    gap: 15px;
  `,
  NavButton: styled(UnstyledButton)`
    font-weight: 500;
    font-size: 24px;

    color: #ffffff;
  `,
};

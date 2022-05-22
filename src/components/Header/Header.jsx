import styled from 'styled-components';
import { Link } from 'react-router-dom';

import PATH from '../../constants/path';
import { CART_SIZE, COLOR } from '../../constants/styles';

import { ReactComponent as CartIcon } from '../shared/CartIcon.svg';
import { BasicButton, Flex } from '../shared/basics';
import { useSelector } from 'react-redux';

function Header() {
  const { carts } = useSelector((state) => state.carts);
  return (
    <header>
      <Styled.NavFlex justify="space-around">
        <Flex align="center">
          <Link to={PATH.ROOT}>
            <CartIcon
              width={CART_SIZE.LARGE.WIDTH}
              height={CART_SIZE.LARGE.HEIGHT}
              fill={COLOR.WHITE}
            />
            <Styled.NavTitle>WOOWA SHOP</Styled.NavTitle>
          </Link>
        </Flex>
        <Flex align="center" gap="15px">
          <Link to={PATH.CARTS}>
            <Styled.NavCartButtonWrapper>
              <Styled.NavButton type="button">장바구니</Styled.NavButton>
              <Styled.BadgeFlex align="center" justify="center">
                {carts.length}
              </Styled.BadgeFlex>
            </Styled.NavCartButtonWrapper>
          </Link>
          <Link to={PATH.ORDERS}>
            <Styled.NavButton type="button">주문목록</Styled.NavButton>
          </Link>
        </Flex>
      </Styled.NavFlex>
    </header>
  );
}

export default Header;

const Styled = {
  NavFlex: styled(Flex)`
    width: 100%;
    height: 80px;

    background: ${COLOR.PRIMARY};
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.3);
  `,
  NavTitle: styled.h1`
    display: inline;
    font-size: 40px;
    font-weight: 900;

    color: #ffffff;
    margin-left: 15px;
  `,
  NavCartButtonWrapper: styled.div`
    position: relative;
  `,
  NavButton: styled(BasicButton)`
    font-weight: 500;
    font-size: 24px;

    color: #ffffff;
  `,
  BadgeFlex: styled(Flex)`
    position: absolute;
    color: white;
    top: -15px;
    right: -15px;
    border-radius: 50%;
    background-color: red;
    width: 25px;
    height: 25px;
  `,
};

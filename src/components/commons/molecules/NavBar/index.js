import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { CartIcon } from '../../';
import * as Styled from './style.js';
import { ROUTE } from '../../../../constants';

export const NavBar = (props) => {
  const cartLength = useSelector(({ cartReducer }) => Object.keys(cartReducer).length);

  return (
    <Styled.NavBar {...props}>
      <Styled.Container>
        <Link to={ROUTE.HOME}>
          <Styled.NavTitle>
            <CartIcon width="50" color="#FFFFFF" />
            <Styled.Title>심바하루의 쇼핑은 즐거워</Styled.Title>
          </Styled.NavTitle>
        </Link>
        <Styled.NavItems>
          <Link to={ROUTE.CART}>
            <Styled.Item noticeLength={cartLength}>장바구니</Styled.Item>
          </Link>
          <Link to={ROUTE.ORDER_LIST}>
            <Styled.Item>주문목록</Styled.Item>
          </Link>
        </Styled.NavItems>
      </Styled.Container>
    </Styled.NavBar>
  );
};

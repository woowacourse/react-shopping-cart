import { Button, CartIcon } from '../../';
import * as Styled from './style.js';

export const NavBar = () => {
  return (
    <Styled.NavBar>
      <Styled.Container>
        <Styled.LeftItems>
          <Button>
            <CartIcon width="50" color="#FFFFFF" />
            <Styled.Title>심바하루의 쇼핑은 즐거워</Styled.Title>
          </Button>
        </Styled.LeftItems>
        <Styled.RightItems>
          <Button>
            <Styled.Item>장바구니</Styled.Item>
          </Button>
          <Button>
            <Styled.Item>주문목록</Styled.Item>
          </Button>
        </Styled.RightItems>
      </Styled.Container>
    </Styled.NavBar>
  );
};

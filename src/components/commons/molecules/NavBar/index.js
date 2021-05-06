import { CartIcon } from '../../';
import * as Styled from './style.js';

export const NavBar = () => {
  return (
    <Styled.NavBar>
      <Styled.Container>
        <Styled.LeftItems>
          <Styled.Button>
            <CartIcon width="50" color="#FFFFFF" />
            <Styled.Title>심바하루의 쇼핑은 즐거워</Styled.Title>
          </Styled.Button>
        </Styled.LeftItems>
        <Styled.RightItems>
          <Styled.Button>
            <Styled.Item>장바구니</Styled.Item>
          </Styled.Button>
          <Styled.Button>
            <Styled.Item>주문목록</Styled.Item>
          </Styled.Button>
        </Styled.RightItems>
      </Styled.Container>
    </Styled.NavBar>
  );
};

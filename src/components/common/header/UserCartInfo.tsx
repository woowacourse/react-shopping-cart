import styled from '@emotion/styled';
import { Text } from '../Text/Text';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useCart from '../../../hooks/useCart';

const UserCartInfo = () => {
  const { cartData } = useCart();

  const [cartTotalQuantity, setCartTotalQuantity] = useState(0);

  useEffect(() => {
    if (cartData) {
      setCartTotalQuantity(cartData.length);
    }
  }, [cartData]);

  return (
    <CardCounterWrapper to="/cart">
      <div>
        <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4gPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik03Ljg3NSAyMkM4LjkxMDUzIDIyIDkuNzUgMjEuMTYwNSA5Ljc1IDIwLjEyNUM5Ljc1IDE5LjA4OTUgOC45MTA1MyAxOC4yNSA3Ljg3NSAxOC4yNUM2LjgzOTQ3IDE4LjI1IDYgMTkuMDg5NSA2IDIwLjEyNUM2IDIxLjE2MDUgNi44Mzk0NyAyMiA3Ljg3NSAyMloiIHN0cm9rZT0iIzMzMzMzMyIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4gPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xNy44NzUgMjJDMTguOTEwNSAyMiAxOS43NSAyMS4xNjA1IDE5Ljc1IDIwLjEyNUMxOS43NSAxOS4wODk1IDE4LjkxMDUgMTguMjUgMTcuODc1IDE4LjI1QzE2LjgzOTUgMTguMjUgMTYgMTkuMDg5NSAxNiAyMC4xMjVDMTYgMjEuMTYwNSAxNi44Mzk1IDIyIDE3Ljg3NSAyMloiIHN0cm9rZT0iIzMzMzMzMyIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4gPHBhdGggZD0iTTUuMjQ1NDUgNi4xNjY1NkgyMUwxOS40NzI3IDEzLjE1ODFDMTkuMzAxMSAxMy45NDk5IDE4LjUzNTEgMTQuNTE1MiAxNy42NTQ1IDE0LjQ5OTdIOC4wNDU0NUM3LjEyNjggMTQuNTA2OCA2LjM0NjY3IDEzLjg4NDcgNi4yMjcyNyAxMy4wNDk3TDQuODQ1NDUgMy40NDk5NkM0LjcyNjkzIDIuNjIxMzEgMy45NTcxOSAyLjAwMTI3IDMuMDQ1NDUgMkgxIiBzdHJva2U9IiMzMzMzMzMiIHN0cm9rZS13aWR0aD0iMiIvPiA8L3N2Zz4g" />
        {cartTotalQuantity > 0 && (
          <CartCounter>
            <Text size="icon" color="#fff">
              {cartTotalQuantity && cartTotalQuantity > 99 ? 99 : cartTotalQuantity}
            </Text>
          </CartCounter>
        )}
      </div>
      <Text size="icon" weight="light">
        장바구니
      </Text>
    </CardCounterWrapper>
  );
};

export default UserCartInfo;

const CardCounterWrapper = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  margin-right: 10px;
  margin-left: 5px;
`;

const CartCounter = styled.div`
  width: 14px;
  height: 14px;
  background-color: #04c09e;
  border-radius: 100px;
  margin-left: 6px;
  text-align: center;
  position: absolute;
  top: -2px;
  right: -2px;
`;

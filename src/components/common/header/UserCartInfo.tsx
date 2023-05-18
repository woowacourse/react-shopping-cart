import styled from '@emotion/styled';
import { useRecoilValue } from 'recoil';
import { Text } from '../Text/Text';
import { cartItemTotalQuantityState } from '../../../service/atom';

const UserCartInfo = () => {
  const cartTotalQuantity = useRecoilValue(cartItemTotalQuantityState);

  return (
    <CardCounterWrapper>
      <Text color="#ffffff" size="large" lineHeight="12px">
        장바구니
      </Text>
      {cartTotalQuantity > 0 && (
        <CartCounter>
          <Text size="smallest" color="#ffffff">
            {cartTotalQuantity > 99 ? 99 : cartTotalQuantity}
          </Text>
        </CartCounter>
      )}
    </CardCounterWrapper>
  );
};

export default UserCartInfo;

const CardCounterWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const CartCounter = styled.div`
  width: 26px;
  height: 26px;
  background-color: #04c09e;
  border-radius: 100px;
  margin-left: 6px;
  text-align: center;
`;

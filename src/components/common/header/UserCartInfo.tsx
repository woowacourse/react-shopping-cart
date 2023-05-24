import styled from '@emotion/styled';
import { Text } from '../Text/Text';
import useCartList from '../../../hooks/useCartList';

const UserCartInfo = () => {
  const { cartList = [] } = useCartList();

  return (
    <CardCounterWrapper>
      <Text color="#ffffff" size="large" lineHeight="12px">
        장바구니
      </Text>
      {cartList.length > 0 && (
        <CartCounter>
          <Text size="smallest" color="#ffffff">
            {cartList.length > 99 ? 99 : cartList.length}
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

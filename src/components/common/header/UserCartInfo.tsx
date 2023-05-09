import styled from '@emotion/styled';
import { Text } from '../Text';

const UserCartInfo = () => {
  return (
    <CardCounterWrapper>
      <Text color="#ffffff" size="large" lineHeight="12px">
        장바구니
      </Text>
      <CartCounter>
        <Text size="smallest" color="#ffffff">
          1
        </Text>
      </CartCounter>
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

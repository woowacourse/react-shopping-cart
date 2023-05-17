import styled from '@emotion/styled';
import CartList from '../list/CartList';
import PriceBox from '../box/PriceBox';
import { Text } from '../common/Text/Text';

const CartListSection = () => {
  return (
    <>
      <Text size="large">장바구니</Text>
      <CartListSectionWrapper>
        <CartList />
        <PriceBox />
      </CartListSectionWrapper>
    </>
  );
};

export default CartListSection;

const CartListSectionWrapper = styled.div`
  display: flex;
  justify-content: space-between;

  width: 70%;
  margin-top: 25px;
  padding: 0 6px;
  border-top: 3px solid #000000;
`;

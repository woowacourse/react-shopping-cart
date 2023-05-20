import styled from 'styled-components';
import CartList from '../../components/CartList';
import PurchaseBox from '../../components/PurchaseBox';

export const CartTitle = styled.div`
  font-style: normal;
  font-weight: 700;
  font-size: 32px;
  line-height: 37px;

  text-align: center;
  letter-spacing: 0.5px;

  margin: 60px 0px 30px 0px;
`;

export const FatBorder = styled.hr`
  border: solid 4px black;
`;

export const CartWrapper = styled.div`
  display: flex;
`;


function Cart() {

  return (
    <div>
      <CartTitle>장바구니</CartTitle>
      <FatBorder />
      <CartWrapper>
        <CartList />
        <PurchaseBox />
      </CartWrapper>
    </div>
  );
}
export default Cart;

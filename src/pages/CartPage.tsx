import styled from 'styled-components';
import CartList from '../components/CartPage/CartList';
import SubTotal from '../components/CartPage/SubTotal';

export default function CartPage() {
  return (
    <>
      <CartPageHeader>장바구니</CartPageHeader>
      <CartList />
      <SubTotal />
    </>
  );
}

const CartPageHeader = styled.div``;

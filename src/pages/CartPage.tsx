import styled from 'styled-components';
import CartList from '../components/CartPage/CartList';
import SubTotal from '../components/CartPage/SubTotal';

export default function CartPage() {
  return (
    <CartPageContainer>
      <CartPageHeader>장바구니</CartPageHeader>
      <CartPageBody>
        <CartList />
        <SubTotal />
      </CartPageBody>
    </CartPageContainer>
  );
}

const CartPageContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: ${({ theme }) => theme.colors.primary};
`;

const CartPageHeader = styled.div`
  margin: 0 11rem;
  padding: 3rem;
  text-align: center;
  ${({ theme }) => theme.fonts.pageTitle}
  border-bottom: 4px solid ${({ theme }) => theme.colors.primary};
`;

const CartPageBody = styled.div`
  display: flex;
  padding-top: 4rem;
  margin: 0 11rem;
  justify-content: space-between;
`;

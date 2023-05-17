import { styled } from 'styled-components';
import { CartProductList } from '../components/CartProductList';
import { PageTitle } from '../components/PageTitle';
import { TotalCartList } from '../components/TotalCartList';

export const CartProductPage = () => {
  return (
    <PageContainer>
      <PageTitle>장바구니</PageTitle>
      <CartListContainer>
        <CartProductList />
        <TotalCartList />
      </CartListContainer>
    </PageContainer>
  );
};

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 1200px;
  margin: 58px auto;
  padding: 20px 30px;
`;

const CartListContainer = styled.div`
  display: flex;
`;

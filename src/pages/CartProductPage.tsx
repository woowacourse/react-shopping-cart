import { styled } from 'styled-components';
import { CartProductList } from '../components/CartProductList';
import { PageTitle } from '../components/PageTitle';

export const CartProductPage = () => {
  return (
    <PageContainer>
      <PageTitle>장바구니</PageTitle>
      <CartProductList />
    </PageContainer>
  );
};

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 1200px;
  margin: 58px auto 0;
  padding: 20px 30px;
`;

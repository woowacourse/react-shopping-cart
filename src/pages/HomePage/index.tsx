import { styled } from 'styled-components';
import ProductList from '@components/ProductList';

const HomePage = () => {
  return (
    <HomePageWrapper>
      <ProductList />
    </HomePageWrapper>
  );
};

const HomePageWrapper = styled.div`
  display: flex;
  justify-content: center;

  padding: 61px 325px;
`;

export default HomePage;

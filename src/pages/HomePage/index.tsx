import { styled } from 'styled-components';
import ProductList from '@components/ProductList';
import { device } from '@styles/theme';

const HomePage = () => {
  return (
    <Wrapper>
      <ProductList />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;

  padding: 61px 20%;

  @media ${device.mobileS} {
    padding: 61px 5%;
  }

  @media ${device.laptopL} {
    padding: 61px 10%;
  }
`;

export default HomePage;

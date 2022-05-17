import StyledButton from 'components/base/button/style';
import styled from 'styled-components';

const PageWrapper = styled.main`
  width: 1000px;
  background-color: white;
  margin-top: 130px;
  height: 600px;
`;

const ContentWrapper = styled.div`
  display: flex;
  height: 100%;
`;

const ShoppingCartContainer = styled.div`
  width: 60%;
  height: 590px;
  padding: 0 20px;
`;

const PaymentAccountContainer = styled.div`
  width: 40%;
  height: 590px;
  padding: 20px;
`;

const ProductDeleteButton = styled(StyledButton)`
  color: black;
  border: 1px solid #bbbbbb;
  padding: 10px 20px;
`;

export {
  PageWrapper,
  ContentWrapper,
  ShoppingCartContainer,
  PaymentAccountContainer,
  ProductDeleteButton,
};

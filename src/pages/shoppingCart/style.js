import StyledButton from 'components/base/button/style';
import styled from 'styled-components';

export const PageWrapper = styled.main`
  width: 1000px;
  background-color: white;
  margin-top: 130px;
  height: 600px;
`;

export const ContentWrapper = styled.div`
  display: flex;
  height: 100%;
`;

export const ShoppingCartContainer = styled.div`
  width: 60%;
  height: 590px;
  padding: 0 20px;
  overflow: hidden;
`;

export const ShoppingCartBox = styled.div`
  height: 80%;
  overflow-y: scroll;
`;

export const TotalAmountContainer = styled.div`
  width: 40%;
  height: 590px;
  padding: 20px;
`;

export const ProductDeleteButton = styled(StyledButton)`
  color: black;
  border: 1px solid #bbbbbb;
  padding: 10px 20px;
`;

export const UnderLine = styled.hr`
  border: 0.5px solid #cccccc;
`;

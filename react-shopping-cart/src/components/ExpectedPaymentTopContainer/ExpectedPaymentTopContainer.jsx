import styled from 'styled-components';

//재사용X
const ExpectedPaymentTopContainer = styled.div`
  padding: 20px;
  font-size: 16px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray_04};
`;

export default ExpectedPaymentTopContainer;

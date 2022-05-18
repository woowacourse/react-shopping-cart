import styled from 'styled-components';

//재사용X
function ExpectedPaymentTopContainer({ children }) {
  return <Styled.Root>{children}</Styled.Root>;
}

const Styled = {
  Root: styled.div`
    padding: 20px;
    font-size: 16px;
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray_04};
  `,
};

export default ExpectedPaymentTopContainer;

import styled from "styled-components";

const PaymentContainer = styled.div`
  margin-top: 80px;
  height: 200px;
`;

const PaymentTitleWrapper = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.GRAY_300};
  padding: 15px;
`;

const PaymentResultContainer = styled.div`
  display: flex;
  border: 1px solid ${({ theme }) => theme.colors.GRAY_300};
  flex-direction: column;
  justify-content: space-between;
  height: 100px;
  padding: 15px;

  div {
    display: flex;
    justify-content: space-between;
  }

  span {
    background: linear-gradient(to top, #99f6e4 50%, white 50%);
  }
`;

export { PaymentContainer, PaymentTitleWrapper, PaymentResultContainer };

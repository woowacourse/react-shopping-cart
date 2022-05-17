import styled from 'styled-components';

const ExpectedPaymentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const ExpectedPaymentText = styled.div`
  font-weight: 700;
  font-size: 13px;
  text-decoration-style: solid;
  text-decoration-line: underline;
  text-decoration-color: ${({ theme }) => theme.colors['opacity_cyon']};
  text-decoration-thickness: 3px;
`;

const ExpectedPaymentBox = ({ price }) => {
  return (
    <ExpectedPaymentWrapper>
      <ExpectedPaymentText>결제 예상 금액</ExpectedPaymentText>
      <ExpectedPaymentText>{price}원</ExpectedPaymentText>
    </ExpectedPaymentWrapper>
  );
};

export default ExpectedPaymentBox;

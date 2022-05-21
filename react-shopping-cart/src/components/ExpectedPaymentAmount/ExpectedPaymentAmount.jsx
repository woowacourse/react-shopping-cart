import styled from 'styled-components';

//재사용X
function ExpectedPaymentAmount({ price }) {
  return (
    <Styled.Root>
      <Styled.ExpectedPaymentText>결제예상금액</Styled.ExpectedPaymentText>
      <Styled.ExpectedPaymentText>{price}원</Styled.ExpectedPaymentText>
    </Styled.Root>
  );
}

const Styled = {
  Root: styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
  `,

  ExpectedPaymentText: styled.div`
    font-weight: 700;
    font-size: 13px;
    text-decoration-style: solid;
    text-decoration-line: underline;
    text-decoration-color: ${({ theme }) => theme.colors.cyon_01};
    text-decoration-thickness: 3px;
  `,
};

export default ExpectedPaymentAmount;

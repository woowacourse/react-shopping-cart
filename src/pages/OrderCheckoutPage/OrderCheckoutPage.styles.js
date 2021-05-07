import styled from '@emotion/styled';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CheckoutListContainer = styled.div`
  width: 60%;
  margin-right: 5%;
`;

const CheckoutListTitle = styled.div`
  color: #333333;
  font-size: 24px;
  font-weight: 700;
  letter-spacing: 0.5px;
  margin-bottom: 20px;
`;

const CheckoutList = styled.div`
  border-top: 4px solid #aaaaaa;

  & > * {
    border-bottom: 1.5px solid #cccccc;
    padding: 20px;
  }
`;

const PaymentInfoBoxContainer = styled.div`
  margin-top: 54px;
`;

export { Container, CheckoutListContainer, CheckoutListTitle, CheckoutList, PaymentInfoBoxContainer };

import styled from '@emotion/styled';

const Container = styled.div`
  display: flex;
  justify-content: center;

  @media screen and (max-width: 900px) {
    flex-direction: column;
    align-items: center;
  }
`;

const CheckoutListContainer = styled.div`
  width: 60%;
  margin-right: 5%;
  min-width: 500px;
`;

const CheckoutListTitle = styled.div`
  color: #333333;
  font-size: 24px;
  font-weight: 700;
  letter-spacing: 0.5px;
  margin-bottom: 20px;
`;

const PaymentInfoBoxContainer = styled.div`
  margin-top: 54px;
`;

export {
  Container,
  CheckoutListContainer,
  CheckoutListTitle,
  PaymentInfoBoxContainer,
};

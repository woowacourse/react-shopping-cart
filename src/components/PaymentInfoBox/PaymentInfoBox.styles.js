import styled from '@emotion/styled';
import { Container as Button } from '../Button/Button.styles';

const Container = styled.div`
  width: 450px;
  height: 320px;
  border: 1px solid #dddddd;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 80px;
  padding: 0 30px;
  font-size: 24px;
  letter-spacing: 0.5px;
  border-bottom: 3px solid #dddddd;
  color: #333333;
  box-sizing: border-box;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 30px;
  height: 240px;
  box-sizing: border-box;
`;

const PaymentDetail = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  font-size: 1.2rem;
  font-weight: 700;

  & > * {
    box-shadow: 0 -8px 1px -2px rgba(42, 193, 188, 0.5) inset;
  }
`;

const PaymentButton = styled(Button)`
  width: 100%;
  height: 70px;
`;

export { Container, Title, Content, PaymentDetail, PaymentButton };

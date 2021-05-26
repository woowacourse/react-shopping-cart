import styled from '@emotion/styled';
import Button from '../../atom/Button/Button';

const Container = styled.div`
  display: flex;
  justify-content: center;
  color: #333333;

  @media screen and (max-width: 900px) {
    flex-direction: column;
    align-items: center;
  }
`;

const ShoppingCartContainer = styled.div`
  width: 60%;
  margin-right: 5%;
  min-width: 500px;
`;

const OptionContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  padding: 20px;
  box-sizing: border-box;

  & > label {
    margin-right: 15px;
  }
  & > button {
    margin-left: auto;
  }
`;

const DeleteButton = styled(Button)`
  border: 1px solid #bbbbbb;
  background-color: #ffffff;
  color: #333333;

  &:hover {
    background-color: #bbbbbb;
  }
`;

const PaymentInfoBoxContainer = styled.div`
  margin-top: 54px;
`;

const EmptyPageImage = styled.img`
  margin: 0 auto;
`;

const ShoppingCartListTitle = styled.div`
  color: #333333;
  font-size: 20px;
  font-weight: 400;
  letter-spacing: 0.5px;
  margin-bottom: 20px;
`;

export {
  Container,
  ShoppingCartListTitle,
  OptionContainer,
  ShoppingCartContainer,
  PaymentInfoBoxContainer,
  DeleteButton,
  EmptyPageImage,
};

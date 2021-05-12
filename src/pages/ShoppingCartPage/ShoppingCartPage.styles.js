import styled from '@emotion/styled';
import { Container as Button } from '../../components/Button/Button.styles';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
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

  @media screen and (max-width: 376px) {
    width: 100%;
    min-width: 240px;
    margin-right: 0;
  }
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

  @media screen and (max-width: 376px) {
    padding: 20px;
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

const ShoppingCartListTitle = styled.div`
  color: #333333;
  font-size: 20px;
  font-weight: 400;
  letter-spacing: 0.5px;
  margin: 0 0 20px 20px;
`;

const ShoppingCartList = styled.div`
  border-top: 4px solid #aaaaaa;
  & > * {
    border-bottom: 1.5px solid #cccccc;
    padding: 20px;
  }
`;

const ShoppingCartItemContainer = styled.div`
  display: flex;
  justify-content: space-between;

  @media screen and (max-width: 376px) {
    flex-direction: column;
  }
`;

const PaymentInfoBoxContainer = styled.div`
  width: 90%;
  margin-top: 54px;
`;

const ShoppingCartItem = styled.div`
  display: flex;
  & > *:not(:last-child) {
    margin-right: 15px;
  }
`;

const ShoppingCartItemOption = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;

  @media screen and (max-width: 376px) {
    margin-top: 1.6rem;
    flex-direction: row;
  }
`;

export {
  Container,
  OptionContainer,
  ShoppingCartContainer,
  ShoppingCartItemContainer,
  ShoppingCartListTitle,
  ShoppingCartList,
  PaymentInfoBoxContainer,
  ShoppingCartItem,
  ShoppingCartItemOption,
  DeleteButton,
};

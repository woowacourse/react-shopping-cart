import Text from '../../shared/Text';
import {
  OrderButton,
  ResultAmountContainer,
  ResultInnerContainer,
  ResultTitle,
  ShoppingCartResultContainer,
} from './style';

const ShoppingCartResult = () => {
  return (
    <ShoppingCartResultContainer>
      <ResultTitle>결제예상금액</ResultTitle>
      <ResultInnerContainer>
        <ResultAmountContainer>
          <Text>결제예상금액</Text>
          <Text>21,700원</Text>
        </ResultAmountContainer>
        <OrderButton>주문하기(2개)</OrderButton>
      </ResultInnerContainer>
    </ShoppingCartResultContainer>
  );
};

export default ShoppingCartResult;

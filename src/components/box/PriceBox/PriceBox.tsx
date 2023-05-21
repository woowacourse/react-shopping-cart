import styled from '@emotion/styled';
import { Text } from '../../common/Text/Text';
import { formatPrice } from '../../../utils/formatPrice';
import type { CartItem } from '../../../types/types';

const PriceBox = ({ checkedCartItemList }: { checkedCartItemList: CartItem[] }) => {
  const totalPrice = checkedCartItemList.reduce((acc, cur) => {
    return acc + cur.quantity * cur.product.price;
  }, 0);

  const deliveryCost = 3000;

  return (
    <PriceBoxWrapper>
      <PriceBoxHeader>결제예상금액</PriceBoxHeader>
      <PriceTextWrapper>
        <TextWrapper>
          <Text size="small" weight="littlebold" color="#333333">
            총 상품가격
          </Text>
          <Text size="small" weight="littlebold" color="#333333">
            {formatPrice(totalPrice)}원
          </Text>
        </TextWrapper>
        <TextWrapper>
          <Text size="small" weight="littlebold" color="#333333">
            총 배송비
          </Text>
          <Text size="small" weight="littlebold" color="#333333">
            {formatPrice(deliveryCost)}원
          </Text>
        </TextWrapper>
        <TotalPriceTextWrapper>
          <Text size="small" weight="littlebold" color="#333333">
            총 주문금액
          </Text>
          <Text size="small" weight="littlebold" color="#333333">
            {formatPrice(totalPrice + deliveryCost)}원
          </Text>
        </TotalPriceTextWrapper>
      </PriceTextWrapper>
      <OrderButton checkedCartItemListLength={checkedCartItemList.length}>주문하기</OrderButton>
    </PriceBoxWrapper>
  );
};

export default PriceBox;

const PriceBoxWrapper = styled.div`
  width: 35%;
  height: 350px;

  margin-top: 70px;
  border: 1px solid #dddddd;

  @media (max-width: 1024px) {
    width: 100%;
  }
`;

const PriceBoxHeader = styled.div`
  height: 70px;
  padding: 18px;

  font-weight: 400;
  font-size: 24px;
  color: #333333;
  border-bottom: 3px solid #dddddd;
`;

const PriceTextWrapper = styled.div`
  padding: 0 18px;
  margin: 20px;
`;

const TextWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
`;

const TotalPriceTextWrapper = styled(TextWrapper)`
  margin-top: 30px;
`;

const OrderButton = styled.button<{ checkedCartItemListLength: number }>`
  width: 90%;
  height: 60px;

  font-size: 20px;
  margin-left: 30px;
  color: #ffffff;
  background: ${(props) => (props.checkedCartItemListLength !== 0 ? '#333333' : '#dee2e6')};
  cursor: ${(props) => (props.checkedCartItemListLength !== 0 ? 'cursor' : 'not-allowed')};
`;

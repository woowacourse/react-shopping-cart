import { styled } from 'styled-components';
import Price from '../common/Price';
import Button from '../common/Button';

interface Props {
  totalProductsPrice: number;
  deliveryFee: number;
}

export default function TotalPayment({ totalProductsPrice, deliveryFee }: Props) {
  const totalOrderPrice = totalProductsPrice + deliveryFee;

  return (
    <Style.TotalPaymentContainer>
      <Style.TitleBox>결제예상금액</Style.TitleBox>
      <Style.PriceAndOrderButtonContainer>
        <Style.PriceContainer>
          <Price price={totalProductsPrice} tag={'총 상품가격'} />
          <Price price={deliveryFee} tag={'총 배송비'} />
          <Price price={totalOrderPrice} tag={'총 주문금액'} />
        </Style.PriceContainer>
        <Button
          designType="rectangle"
          bgColor="var(--grey-500)"
          color="var(--grey-100)"
          fontSize="20px"
        >
          주문하기
        </Button>
      </Style.PriceAndOrderButtonContainer>
    </Style.TotalPaymentContainer>
  );
}

const Style = {
  TotalPaymentContainer: styled.div`
    width: 300px;
    height: fit-content;
    border: 1px solid var(--grey-300);
  `,

  TitleBox: styled.div`
    padding: 25px;

    font-size: 20px;
  `,

  PriceAndOrderButtonContainer: styled.div`
    border-top: 1px solid var(--grey-300);
    padding: 25px;
  `,

  PriceContainer: styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 30px;
  `,
};

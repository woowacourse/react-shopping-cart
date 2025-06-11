import { DELIVERY_FEE } from '../../../../global/constants';
import SelectBox from '../../../common/selectBox/SelectBox';
import Separator from '../../../common/separator/Separator';
import * as S from './OrderPrice.styles';
import usePaymentCalculation from '../hooks/usePaymentCalculation';
import FooterButton from '../../../common/footerButton/FooterButton';
import { useNavigate } from 'react-router';
import { useCouponContext } from '../contexts/CouponContext';

interface OrderPriceProps {
  order: {
    uniqueProductCount: number;
    productQuantity: number;
    price: number;
    deliveryFee: number;
  };
}

function OrderPrice({ order }: OrderPriceProps) {
  const { isIslandAreaSelected, setIsIslandAreaSelected, totalDiscount } =
    useCouponContext();
  const { extraDeliveryFee, totalPrice } = usePaymentCalculation(
    order.price,
    totalDiscount
  );

  const navigate = useNavigate();

  const moveToPayment = () => {
    navigate('/payment', {
      state: {
        quantity: order.uniqueProductCount,
        productQuantity: order.productQuantity,
        price: totalPrice,
      },
    });
  };

  return (
    <S.Container>
      <S.DeliveryTitle>배송 정보</S.DeliveryTitle>
      <S.DeliveryCheckBox>
        <SelectBox
          selected={isIslandAreaSelected}
          onClick={() => setIsIslandAreaSelected(!isIslandAreaSelected)}
        />
        <S.DeliveryText>제주도 및 도서 산간 지역</S.DeliveryText>
      </S.DeliveryCheckBox>
      <S.Description>
        <img src="./assets/Notification.svg" />
        <S.DescriptionText>
          {`총 주문 금액이 ${DELIVERY_FEE.MINIMUM.toLocaleString()}원 이상일 경우 무료 배송됩니다.`}
        </S.DescriptionText>
      </S.Description>
      <Separator />
      <S.IndividualPriceBox>
        <S.PriceRow data-testid="price-row">
          <S.PriceLabel>주문 금액</S.PriceLabel>
          <S.PriceAmount>{order.price.toLocaleString()}원</S.PriceAmount>
        </S.PriceRow>
        <S.PriceRow data-testid="price-row">
          <S.PriceLabel>쿠폰 할인 금액</S.PriceLabel>
          <S.PriceAmount>-{totalDiscount.toLocaleString()}원</S.PriceAmount>
        </S.PriceRow>
        <S.PriceRow data-testid="price-row">
          <S.PriceLabel>배송비</S.PriceLabel>
          <S.PriceAmount>
            {(order.deliveryFee + extraDeliveryFee).toLocaleString()}원
          </S.PriceAmount>
        </S.PriceRow>
      </S.IndividualPriceBox>
      <Separator />
      <S.PriceRow data-testid="price-row">
        <S.PriceLabel>총 결제 금액</S.PriceLabel>
        <S.PriceAmount>{totalPrice.toLocaleString()}원</S.PriceAmount>
      </S.PriceRow>
      <FooterButton onClick={moveToPayment}>결제하기</FooterButton>
    </S.Container>
  );
}

export default OrderPrice;

import * as S from './PriceSection.styles';
import Line from '../../../common/Line';
import {formatPrice} from '../../../../utils/formatPrice';

type Props = {
  orderPrice: number;
  deliveryPrice: number;
  totalPrice: number;
  discountPrice?: number;
};

const FREE_ORDER_PRICE = 100000;

const PriceSection = ({
  orderPrice,
  deliveryPrice,
  totalPrice,
  discountPrice,
}: Props) => {
  return (
    <S.Container>
      <S.Description>
        ※ 총 주문 금액이 {formatPrice(FREE_ORDER_PRICE)} 이상일 경우 무료
        배송됩니다.
      </S.Description>
      <Line />

      <S.PriceInfo>
        <S.Label>주문 금액</S.Label>
        <S.Price>{formatPrice(orderPrice)}</S.Price>
      </S.PriceInfo>

      {discountPrice !== undefined && (
        <S.PriceInfo>
          <S.Label>쿠폰 할인 금액</S.Label>
          <S.Price>{formatPrice(discountPrice)}</S.Price>
        </S.PriceInfo>
      )}

      <S.PriceInfo>
        <S.Label>배송비</S.Label>
        <S.Price>{formatPrice(deliveryPrice)}</S.Price>
      </S.PriceInfo>
      <Line />

      <S.PriceInfo>
        <S.Label>총 결제 금액</S.Label>
        <S.Price>{formatPrice(totalPrice)}</S.Price>
      </S.PriceInfo>
    </S.Container>
  );
};

export default PriceSection;

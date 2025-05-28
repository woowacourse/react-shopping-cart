import * as S from "./PriceSection.styles";
import Line from "../../../common/Line";
import { CartProduct } from "../../../../type/cart";
import { formatPrice } from "../../../../utils/formatPrice";

type Props = {
  cartItems: CartProduct[] | undefined;
  selectedCartId: number[];
};

const PriceSection = ({ cartItems, selectedCartId }: Props) => {
  const getOrderPrice = () => {
    const selectedItem = cartItems?.filter(
      (item: CartProduct) => selectedCartId.indexOf(item.id) > -1
    );
    return (
      selectedItem?.reduce(
        (total: number, current: CartProduct) =>
          current.product.price * current.quantity + total,
        0
      ) ?? 0
    );
  };

  const orderPrice = getOrderPrice();
  const deliveryPrice = orderPrice >= 100_000 ? 0 : 3000;
  const totalPrice = orderPrice + deliveryPrice;

  return (
    <S.Container>
      <S.Description>
        ※ 총 주문 금액이 100,000원 이상일 경우 무료 배송됩니다.
      </S.Description>
      <Line />

      <S.PriceInfo>
        <S.Label>주문 금액</S.Label>
        <S.Price>{formatPrice(orderPrice)}</S.Price>
      </S.PriceInfo>

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

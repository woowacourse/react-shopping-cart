import * as S from "./PriceSection.styles";
import Line from "../../../common/Line";
import { formatPrice } from "../../../../utils/formatPrice";
import { CartProduct } from "../../../../type/cart";
import Button from "../../../common/Button";
import { css } from "@emotion/react";
import { useNavigate } from "react-router";

type Props = {
  cartItems: CartProduct[] | undefined;
  selectedCartIds: number[];
};

const PriceSection = ({ cartItems, selectedCartIds }: Props) => {
  const navigate = useNavigate();
  const selectedItem = cartItems?.filter(
    (item: CartProduct) => selectedCartIds.indexOf(item.id) > -1
  );

  const getOrderPrice = () => {
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
  const totalAmount = selectedItem?.reduce(
    (total: number, current: CartProduct) => total + current.quantity,
    0
  );

  return (
    <>
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
      <Button
        testId="order-confirm-button"
        title="주문 확인"
        disabled={selectedCartIds.length === 0}
        onClick={() =>
          navigate("/confirm", {
            state: {
              sort: selectedCartIds.length,
              totalAmount: totalAmount,
              totalPrice: totalPrice,
            },
          })
        }
        css={css`
          width: 100%;
          height: 50px;
          background-color: #000;
          color: #fff;
          font-weight: 700;
          font-size: 16px;
          position: fixed;
          bottom: 0;
          left: 0;
        `}
      />
    </>
  );
};

export default PriceSection;

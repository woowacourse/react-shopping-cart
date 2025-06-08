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
  discount?: number;
  isRemoteArea?: boolean;
};

export const getPrice = (items: CartProduct[] | undefined) => {
  const getOrderPrice = () => {
    return (
      items?.reduce(
        (total: number, current: CartProduct) =>
          current.product.price * current.quantity + total,
        0
      ) ?? 0
    );
  };

  const orderPrice = getOrderPrice();
  const deliveryPrice = orderPrice >= 100_000 ? 0 : 3000;
  const totalPrice = orderPrice + deliveryPrice;
  const totalAmount = items?.reduce(
    (total: number, current: CartProduct) => total + current.quantity,
    0
  );

  return { orderPrice, deliveryPrice, totalPrice, totalAmount };
};

const PriceSection = ({
  cartItems,
  selectedCartIds,
  discount,
  isRemoteArea,
}: Props) => {
  const navigate = useNavigate();
  const selectedItems = cartItems?.filter(
    (item: CartProduct) => selectedCartIds.indexOf(item.id) > -1
  );

  const price = getPrice(selectedItems);
  if (isRemoteArea) price.deliveryPrice += 3000;

  return (
    <>
      <S.Container>
        <S.Description>
          ※ 총 주문 금액이 100,000원 이상일 경우 무료 배송됩니다.
        </S.Description>
        <Line />

        <S.PriceInfo>
          <S.Label>주문 금액</S.Label>
          <S.Price>{formatPrice(price.orderPrice)}</S.Price>
        </S.PriceInfo>

        {discount && (
          <S.PriceInfo>
            <S.Label>쿠폰 할인 금액</S.Label>
            <S.Price>-{formatPrice(discount)}</S.Price>
          </S.PriceInfo>
        )}

        <S.PriceInfo>
          <S.Label>배송비</S.Label>
          <S.Price>{formatPrice(price.deliveryPrice)}</S.Price>
        </S.PriceInfo>
        <Line />

        <S.PriceInfo>
          <S.Label>총 결제 금액</S.Label>
          <S.Price data-testid={"total-amount"}>
            {formatPrice(price.totalPrice)}
          </S.Price>
        </S.PriceInfo>
      </S.Container>
      <Button
        testId="order-confirm-button"
        title="주문 확인"
        disabled={selectedCartIds.length === 0}
        onClick={() =>
          navigate("/orderConfirm", {
            state: {
              sort: selectedCartIds.length,
              totalAmount: price.totalAmount,
              totalPrice: price.totalPrice,
              cartItems: cartItems,
              selectedCartIds: selectedCartIds,
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

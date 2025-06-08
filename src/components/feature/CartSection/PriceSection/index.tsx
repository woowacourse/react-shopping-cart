import * as S from "./PriceSection.styles";
import Line from "../../../common/Line";
import { formatPrice } from "../../../../utils/formatPrice";
import { CartProduct } from "../../../../type/cart";
import Button from "../../../common/Button";
import { css } from "@emotion/react";
import { useNavigate, useLocation } from "react-router";
import { getPrice } from "./utils";
import { getSelectedCartItems } from "../../Coupon/CouponList/utils";

type Props = {
  cartItems: CartProduct[];
  selectedCartIds: number[];
  discount?: number;
  isRemoteArea?: boolean;
};

const PriceSection = ({
  cartItems,
  selectedCartIds,
  discount,
  isRemoteArea,
}: Props) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isHomePage = pathname === "/";
  const isOrderConfirmPage = pathname === "/orderConfirm";

  const { orderPrice, deliveryPrice, totalPrice, totalAmount } = getPrice({
    items: getSelectedCartItems(cartItems, selectedCartIds),
    isRemoteArea,
    discount,
  });

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

        {discount !== undefined && (
          <S.PriceInfo>
            <S.Label>쿠폰 할인 금액</S.Label>
            <S.Price>-{formatPrice(discount)}</S.Price>
          </S.PriceInfo>
        )}

        <S.PriceInfo>
          <S.Label>배송비</S.Label>
          <S.Price>{formatPrice(deliveryPrice)}</S.Price>
        </S.PriceInfo>
        <Line />

        <S.PriceInfo>
          <S.Label>총 결제 금액</S.Label>
          <S.Price data-testid={"total-amount"}>
            {formatPrice(totalPrice)}
          </S.Price>
        </S.PriceInfo>
      </S.Container>
      {isOrderConfirmPage && (
        <Button
          title="결제하기"
          onClick={() =>
            navigate("/paymentConfirm", {
              state: {
                totalPrice: totalPrice,
                totalAmount: totalAmount,
                sort: selectedCartIds.length,
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
      )}
      {isHomePage && (
        <Button
          testId="order-confirm-button"
          title="주문 확인"
          disabled={selectedCartIds.length === 0}
          onClick={() =>
            navigate("/orderConfirm", {
              state: {
                sort: selectedCartIds.length,
                totalAmount: totalAmount,
                totalPrice: orderPrice,
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
      )}
    </>
  );
};

export default PriceSection;

import * as S from "./confirm.styles";
import Button from "../../components/common/Button";
import { css } from "@emotion/react";
import { useLocation } from "react-router";
import OrderProduct from "../../components/feature/Order/Card";
import { CartProduct } from "../../type/cart";
import PriceSection from "../../components/feature/CartSection/PriceSection";
import CheckBox from "../../components/common/CheckBox";

const Confirm = () => {
  const location = useLocation();
  const { sort, totalAmount, cartItems, selectedCartIds } = location.state;
  return (
    <>
      <S.Container data-testid="order-confirm-description">
        <S.Title>주문 확인</S.Title>
        <S.Description>
          총 {sort}종류의 상품 {totalAmount}개를 주문합니다.
          <br /> 최종 결제 금액을 확인해 주세요.
        </S.Description>
        <S.OrderList>
          {cartItems.map((item: CartProduct) => (
            <OrderProduct item={item} key={item.id} />
          ))}
        </S.OrderList>
        <Button
          title="쿠폰 적용"
          onClick={() => {}}
          css={css`
            padding: 15px 0;
            color:#333333BF
            font-weight: 700;
            font-size: 15px;
          `}
        />
        <S.OrderInfo>
          <S.OrderInfoTitle>배송 정보</S.OrderInfoTitle>
          <CheckBox label="제주도 및 도서 산간 지역" />
        </S.OrderInfo>
        <PriceSection
          cartItems={cartItems}
          selectedCartIds={selectedCartIds}
          discount={3000}
        />
      </S.Container>

      <Button
        title="결제하기"
        onClick={() => {}}
        css={css`
          width: 100%;
          padding: 24px 0;
          background-color: #000;
          color: #fff;
          font-weight: 700;
          font-size: 16px;
          position: absolute;
          bottom: 0;
        `}
      />
    </>
  );
};

export default Confirm;

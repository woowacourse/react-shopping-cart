import * as S from "./confirm.styles";
import Button from "../../components/common/Button";
import { css } from "@emotion/react";
import { useLocation } from "react-router";
import OrderProduct from "../../components/feature/Order/Card";
import { CartProduct } from "../../type/cart";
import PriceSection from "../../components/feature/CartSection/PriceSection";
import CheckBox from "../../components/common/CheckBox";
import Modal from "../../components/common/Modal";
import useGetCoupons from "../../hooks/useGetCoupons";
import CouponList from "../../components/feature/Coupon/CouponList";
import { useState } from "react";
import { MAX_COUPON_COUNT } from "./constant";

const Confirm = () => {
  const location = useLocation();
  const { sort, totalAmount, cartItems, selectedCartIds } = location.state;
  const { coupons } = useGetCoupons();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRemoteAreaChecked, setRemoteAreaChecked] = useState(false);
  const [selectedIds, setSelectedIds] = useState([1, 2]);

  const handleSelectCoupon = (id: number) => {
    const isSelected = selectedIds.includes(id);

    if (!isSelected && selectedIds.length >= MAX_COUPON_COUNT) {
      alert(`쿠폰은 ${MAX_COUPON_COUNT}개만 선택할 수 있습니다.`);
      return;
    }

    setSelectedIds((prev) =>
      isSelected ? prev.filter((prevId) => prevId !== id) : [...prev, id]
    );
  };

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
          onClick={() => setIsModalOpen(true)}
          css={css`
            padding: 15px 0;
            color:#333333BF
            font-weight: 700;
            font-size: 15px;
          `}
        />
        <S.OrderInfo>
          <S.OrderInfoTitle>배송 정보</S.OrderInfoTitle>
          <CheckBox
            label="제주도 및 도서 산간 지역"
            isChecked={isRemoteAreaChecked}
            onChange={() => setRemoteAreaChecked((prev) => !prev)}
          />
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
      <Modal
        onClose={() => setIsModalOpen(false)}
        isOpen={isModalOpen}
        size="large"
      >
        {coupons && (
          <CouponList
            coupons={coupons}
            selectedIds={selectedIds}
            onSelect={handleSelectCoupon}
          />
        )}
      </Modal>
    </>
  );
};

export default Confirm;

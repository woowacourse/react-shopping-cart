import { Modal } from "ryan-modal";
import styled from "styled-components";

import CouponView from "./CouponView";

import { MAX_SELECTABLE_COUPON_COUNT } from "../../../hooks/useCoupons/ruleConstants";
import { Coupon } from "../../../types/coupon";
import { formatToKRW } from "../../../utils/domain/formatToKRW";
import { ReactComponent as InfoIcon } from "../../../assets/info-icon.svg";

export interface CouponModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  coupons: Coupon[];
  discountAmount: number;
  toggleCouponSelection: (couponId: number) => void;
}

export default function CouponModal({
  isOpen,
  setIsOpen,
  coupons,
  discountAmount,
  toggleCouponSelection,
}: CouponModalProps) {
  const onClose = () => setIsOpen(false);

  const isButtonDisabled = discountAmount === 0;
  const isMaxCouponsSelected =
    coupons.filter(({ isSelected }) => isSelected).length >= MAX_SELECTABLE_COUPON_COUNT;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.Dimmer />
      <Modal.Content style={{ width: "380px" }}>
        <S.InnerWrapper>
          <Modal.CloseButton />
          <S.Title>쿠폰을 선택해 주세요</S.Title>
          <div>
            <S.Info>
              <S.InfoIcon />
              <span>쿠폰은 최대 2개까지 사용할 수 있습니다.</span>
            </S.Info>
            <S.CouponList>
              {coupons.map((coupon) => (
                <CouponView
                  key={coupon.id}
                  coupon={coupon}
                  toggleSelection={() => toggleCouponSelection(coupon.id)}
                  hasReachedMaxCount={isMaxCouponsSelected}
                />
              ))}
            </S.CouponList>
          </div>
          <Modal.Button disabled={isButtonDisabled} fullWidth onClick={onClose}>
            총 {formatToKRW(discountAmount)} 할인 쿠폰 사용하기
          </Modal.Button>
        </S.InnerWrapper>
      </Modal.Content>
    </Modal>
  );
}

const S = {
  InnerWrapper: styled.div`
    display: flex;
    flex-direction: column;
    gap: 28px;
  `,

  InfoIcon: styled(InfoIcon)`
    width: 16px;
    height: 16px;
  `,

  Info: styled.div`
    font-size: 12px;
    display: flex;
    align-items: center;
    gap: 5px;
    margin-bottom: 10px;
  `,

  Title: styled.div`
    font-size: 18px;
    font-weight: 700;
  `,

  CouponList: styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
  `,
};

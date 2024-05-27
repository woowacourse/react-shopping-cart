import { Modal } from "@cys4585/react-modal";
import { Coupon } from "../../../types/coupons";
import { useCouponControl } from "../../../hooks/useCouponControl";
import styled from "styled-components";
import { ReactComponent as InfoIcon } from "../../../assets/info-icon.svg";
import CouponItem from "./CouponItem";

interface ApplyCouponModalProps {
  isOpen: boolean;
  fetchedCoupons: Coupon[];
  onClose: () => void;
}
export default function ApplyCouponModal({
  isOpen,
  fetchedCoupons,
  onClose,
}: ApplyCouponModalProps) {
  const {
    coupons,
    discountAmount,
    isCheckableCouponsYet,
    toggleSelection,
    applySelectedCoupons,
  } = useCouponControl(fetchedCoupons);

  const onApplyButtonClick = () => {
    applySelectedCoupons();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="small">
      <Modal.Header title="쿠폰을 선택해 주세요" onClose={onClose} />
      <Modal.Content>
        <S.ContentWrapper>
          <S.CouponNoti>
            <S.InfoIcon />
            <S.CouponNotiText />
            쿠폰은 최대 2개까지 사용할 수 있습니다.
          </S.CouponNoti>
          <S.CouponList>
            {coupons.map((coupon) => (
              <CouponItem
                key={coupon.id}
                coupon={coupon}
                isCheckableCouponsYet={isCheckableCouponsYet}
                onChange={() => toggleSelection(coupon.id)}
              />
            ))}
          </S.CouponList>
        </S.ContentWrapper>
      </Modal.Content>
      <Modal.Footer>
        <Modal.Footer.Button onClick={onApplyButtonClick}>
          <S.ButtonContent>
            총{discountAmount.toLocaleString()}원 할인 쿠폰 사용하기
          </S.ButtonContent>
        </Modal.Footer.Button>
      </Modal.Footer>
    </Modal>
  );
}

const S = {
  ContentWrapper: styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
  `,

  CouponNoti: styled.div`
    font-size: 14px;
    color: #888;
    display: flex;
    align-items: center;
    gap: 4px;
  `,
  InfoIcon: styled(InfoIcon)`
    width: 16px;
    height: 16px;
  `,
  CouponNotiText: styled.span`
    font-size: 12px;
    font-weight: 500;
    line-height: 15px;
    color: rgba(10, 13, 19, 1);
  `,

  CouponList: styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
  `,

  ButtonContent: styled.span`
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
  `,
};

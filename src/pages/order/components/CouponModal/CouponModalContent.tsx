import * as S from "./CouponModalContent.styled";
import { Modal } from "hoyychoi-modal-component";
import Button from "../../../../shared/components/common/Button";
import CouponList from "../CouponList";
import { useTempCoupon } from "../../hooks/useTempCoupon";
import Text from "../../../../shared/components/common/Text";
import GuideSign from "../../../../shared/components/icons/GuideSign";
import { useOrderContext } from "../../contexts/OrderContext";
import { MAX_SELECTABLE_COUPONS } from "../../constants";
import { useCouponModalContext } from "../../contexts/CouponModalContext";

const CouponModalContent = () => {
  const { isCouponModalOpen, handleCouponModalClose } = useCouponModalContext();
  const { coupons, availableCoupons, updateApplyCoupon } = useOrderContext();
  const { tempAvailableCoupons, discountPrice, handleTempToggleCoupon, applySelectedCoupons } = useTempCoupon({
    availableCoupons,
    updateApplyCoupon,
  });

  return (
    <Modal show={isCouponModalOpen} onHide={handleCouponModalClose}>
      <Modal.BackDrop />
      <Modal.Container style={{ width: "calc(100% - 48px)" }} gap={32}>
        <Modal.Header closeButton>
          <Modal.Title>쿠폰을 선택해 주세요</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ display: "flex", flexDirection: "column", gap: "17px" }}>
          <S.Wrap gap={4}>
            <GuideSign />
            <Text variant="body-2">쿠폰은 최대 {MAX_SELECTABLE_COUPONS}개까지 사용할 수 있습니다.</Text>
          </S.Wrap>
          <CouponList
            couponData={coupons}
            availableCoupons={tempAvailableCoupons}
            toggleCoupon={handleTempToggleCoupon}
          />
        </Modal.Body>
        <Modal.Footer>
          <Modal.Trigger>
            <Button variant="primary" size="full" onClick={applySelectedCoupons}>
              총 {discountPrice.toLocaleString()}원 할인 쿠폰 사용하기
            </Button>
          </Modal.Trigger>
        </Modal.Footer>
      </Modal.Container>
    </Modal>
  );
};

export default CouponModalContent;

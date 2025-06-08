import Modal from "compoents-modal-test-kangoll";
import { useEffect } from "react";
import Button from "../../../components/Button/Button";
import { InfoText } from "../../../components/InfoText/InfoText";
import { CouponList } from "../components/CouponList/CouponList";
import { useCoupons } from "../hooks/useCoupons";
import { useSelectedCoupons } from "../hooks/useSelectedCoupons";
import { useTwoPlusOneApplicableItems } from "../hooks/useTwoPlusOneApplicableItems";

interface CouponModalProps {
  isModalOpen: boolean;
  handleModalClose: () => void;
  deliveryFee: number;
  orderPrice: number;
  setReceivedDiscountedPrice?: (price: number) => void;
}

export function CouponModal({
  isModalOpen,
  handleModalClose,
  deliveryFee,
  orderPrice,
  setReceivedDiscountedPrice,
}: CouponModalProps) {
  const { isValidCoupon, coupons } = useCoupons();
  const twoPlusOneApplicableItems = useTwoPlusOneApplicableItems();
  const { selectedCoupons, handleCouponSelect, discountedPrice } =
    useSelectedCoupons({
      deliveryFee,
      orderPrice,
      twoPlusOneApplicableItems,
    });

  useEffect(() => {
    if (setReceivedDiscountedPrice) setReceivedDiscountedPrice(discountedPrice);
  }, [discountedPrice, setReceivedDiscountedPrice]);

  return (
    <Modal
      position="center"
      isOpen={isModalOpen}
      onClose={handleModalClose}
      size="sm"
      backdropClosable
    >
      <Modal.Header hasCloseButton>쿠폰을 선택해주세요</Modal.Header>
      <Modal.Content>
        <InfoText showImg>쿠폰은 최대 2개까지 사용할 수 있습니다.</InfoText>
        <CouponList
          handleCouponSelect={handleCouponSelect}
          isValidCoupon={isValidCoupon({
            orderPrice,
            twoPlusOneApplicableItems,
          })}
          selectedCoupons={selectedCoupons}
          coupons={coupons}
        />
      </Modal.Content>
      <Modal.Footer>
        <Button onClick={handleModalClose} size="full">
          총 {discountedPrice.toLocaleString()}원 할인 쿠폰 사용하기
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

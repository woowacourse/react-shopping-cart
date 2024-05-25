/** @jsxImportSource @emotion/react */
import { Modal } from "fe-custom-modal";
import { IoIosInformationCircleOutline } from "react-icons/io";
import CouponItem from "../../CouponItem/CouponItem";
import { useCoupons } from "../../../hooks/useCoupons";
import { CouponGuideContainerStyle, CouponGuideStyle, CouponModalContainerStyle } from "./CouponModal.style";
import { useRecoilState, useRecoilValue } from "recoil";
import { selectedCouponsState } from "../../../store/atom/atoms";
import { useEffect, useState } from "react";
import { orderAmountSelector } from "../../../store/selector/selectors";
import { useCouponApplicabilityChecker } from "../../../hooks/useCouponApplicabilityChecker";

interface CouponModalProps {
  isOpen: boolean;
  modalClose: () => void;
}

const CouponModal = ({ isOpen, modalClose }: CouponModalProps) => {
  const { coupons, calculateTotalDiscountAmount } = useCoupons();
  const { isCouponApplicable } = useCouponApplicabilityChecker();

  const totalAmount = useRecoilValue(orderAmountSelector);
  const [selectedCoupons, setSelectedCoupons] = useRecoilState(selectedCouponsState);

  const [tempSelectedCoupons, setTempSelectedCoupons] = useState<Coupon[]>(selectedCoupons);

  // 실제로 적용된 쿠폰만 체크 표시되도록 처리
  useEffect(() => {
    if (isOpen) {
      setTempSelectedCoupons(selectedCoupons);
    }
  }, [isOpen, selectedCoupons]);

  // totalAmount가 바뀔 때(아이템 수량 변경), 페이지에 돌아왔을 때 유효하지 않은 쿠폰 적용 해제
  useEffect(() => {
    const validCoupons = selectedCoupons.filter((coupon) => isCouponApplicable(coupon, totalAmount));
    if (validCoupons.length !== selectedCoupons.length) {
      setSelectedCoupons(validCoupons);
    }
  }, [totalAmount, isCouponApplicable, selectedCoupons, setSelectedCoupons]);

  const updateSelectedCoupons = () => {
    setSelectedCoupons(tempSelectedCoupons);
  };

  const handleCouponSelect = (coupon: Coupon) => {
    setTempSelectedCoupons((prev) => {
      if (prev.some((selected) => selected.id === coupon.id)) {
        return prev.filter((selected) => selected.id !== coupon.id);
      } else {
        return [...prev, coupon];
      }
    });
  };

  const confirmButtonContent = `총 ${calculateTotalDiscountAmount(tempSelectedCoupons)}원 할인 
  ${tempSelectedCoupons.some((selected) => selected.discountType === "freeShipping") ? "+ 무료 배송 " : ""}
  쿠폰 사용하기`;

  return (
    <>
      {isOpen && (
        <Modal
          modalPosition="center"
          modalSize={{ width: "90%", height: "fit-content" }}
          modalHeader={{
            title: { content: "쿠폰을 선택해 주세요", fontSize: "18px", position: "left" },
            closeButton: {
              display: true,
              onClose: () => {
                modalClose();
              },
            },
          }}
          modalFooter={{
            confirmButton: {
              content: confirmButtonContent,
              fontSize: "15px",
              fontWeight: "700",
              onConfirm: () => {
                updateSelectedCoupons();
                modalClose();
              },
            },
          }}
        >
          <div css={CouponModalContainerStyle}>
            <div css={CouponGuideContainerStyle}>
              <IoIosInformationCircleOutline size={15} />
              <div css={CouponGuideStyle}>쿠폰은 최대 2개까지 사용할 수 있습니다.</div>
            </div>
            {coupons.map((coupon: Coupon) => (
              <CouponItem
                key={coupon.id}
                couponInfo={coupon}
                isCheck={tempSelectedCoupons.some((selected) => selected.id === coupon.id)}
                isDisabled={
                  // 유효하지 않거나, 쿠폰 2개를 선택했을 때 해당 쿠폰이 선택되지 않은 상태라면 disabled
                  !isCouponApplicable(coupon, totalAmount) ||
                  (tempSelectedCoupons.every((selected) => selected.id !== coupon.id) &&
                    tempSelectedCoupons.length === 2)
                }
                onSelect={(coupon: Coupon) => handleCouponSelect(coupon)}
              />
            ))}
          </div>
        </Modal>
      )}
    </>
  );
};

export default CouponModal;

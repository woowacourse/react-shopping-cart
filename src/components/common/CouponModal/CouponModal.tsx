/** @jsxImportSource @emotion/react */
import { Modal } from "fe-custom-modal";
import { IoIosInformationCircleOutline } from "react-icons/io";
import CouponItem from "../../CouponItem/CouponItem";
import { useCoupons } from "../../../hooks/useCoupons";
import { CouponGuideContainerStyle, CouponGuideStyle, CouponModalContainerStyle } from "./CouponModal.style";

interface CouponModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CouponModal = ({ isOpen, onClose }: CouponModalProps) => {
  const { coupons } = useCoupons();
  // const { calculateDiscountAmount } = useDiscountCalculator();

  return (
    <>
      {isOpen && (
        <Modal
          modalPosition="center"
          modalSize={{ width: "90%", height: "fit-content" }}
          modalHeader={{
            title: { content: "쿠폰을 선택해 주세요", fontSize: "18px", position: "left" },
            closeButton: { display: true, onClose },
          }}
          modalFooter={{
            confirmButton: {
              content: `총 ${6000}원 할인 쿠폰 사용하기`,
              fontSize: "15px",
              fontWeight: "700",
              onConfirm: () => {
                console.log("confirm");
                onClose();
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
              <CouponItem couponInfo={coupon} key={coupon.id} />
            ))}
          </div>
        </Modal>
      )}
    </>
  );
};

export default CouponModal;

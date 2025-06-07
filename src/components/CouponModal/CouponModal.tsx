import { Modal } from "pongju-modal-component";
import Text from "../@common/Text/Text";
import { MAX_COUPON_COUNT } from "../../constants";
import { InfoRow } from "../PriceSummary/PriceSummary";
import { CouponItem } from "./CouponItem";
import { Coupon } from "../../types/type";
import { useCartItemContext } from "../../contexts/useCartItemContext";

interface CouponModalProps {
  isOpen: boolean;
  onModalClose: () => void;
  coupons: Coupon[];
  couponDiscountAmount: number;
  selectedCouponIds: Set<number>;
  toggleCouponId: (id: number) => void;
  calculateCouponDiscount: (coupon: Coupon, price: number) => number;
}

export const CouponModal = ({
  isOpen,
  onModalClose,
  coupons,
  couponDiscountAmount,
  selectedCouponIds,
  toggleCouponId,
  calculateCouponDiscount,
}: CouponModalProps) => {
  const { orderPrice } = useCartItemContext();

  return (
    <Modal isOpen={isOpen} onClose={onModalClose}>
      <Modal.Backdrop>
        <Modal.Frame styled={{ width: "400px" }} autoModalFocus={false}>
          <Text text="쿠폰을 선택해 주세요" type="large" />
          <Modal.CloseButton />
          <Modal.Body>
            <div className={InfoRow}>
              <img src="./info-icon.svg" alt="info" />
              <Text
                text={`쿠폰은 최대 ${MAX_COUPON_COUNT}개까지 사용할 수 있습니다.`}
              />
            </div>
            {coupons.map((coupon) => {
              const isSelected = selectedCouponIds.has(coupon.id);
              return (
                <CouponItem
                  key={coupon.id}
                  name={coupon.description}
                  isSelected={isSelected}
                  onClick={() => toggleCouponId(coupon.id)}
                  expiration={coupon.expirationDate}
                  availableTime={
                    coupon.discountType === "percentage"
                      ? coupon.availableTime
                      : undefined
                  }
                  minOrderPrice={
                    coupon.discountType === "fixed" ||
                    coupon.discountType === "freeShipping"
                      ? coupon.minimumAmount
                      : undefined
                  }
                  disabled={
                    calculateCouponDiscount(coupon, orderPrice) ? false : true
                  }
                />
              );
            })}
          </Modal.Body>
          <Modal.Button
            title={`총 ${couponDiscountAmount.toLocaleString()}원 할인 쿠폰 사용하기`}
            onClick={onModalClose}
            size="large"
            styled={{ height: "44px" }}
          />
        </Modal.Frame>
      </Modal.Backdrop>
    </Modal>
  );
};

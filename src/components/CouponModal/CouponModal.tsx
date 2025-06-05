import { Modal } from "pongju-modal-component";
import Text from "../@common/Text/Text";
import { MAX_COUPON_COUNT } from "../../constants";
import { InfoRow } from "../PriceSummary/PriceSummary";
import { CouponItem } from "./CouponItem";
import { coupons } from "../../constants/Coupons";

interface CouponModalProps {
  isOpen: boolean;
  onModalClose: () => void;
}

export const CouponModal = ({ isOpen, onModalClose }: CouponModalProps) => {
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
            {coupons.map((coupon) => (
              <CouponItem
                name={coupon.name}
                isSelected={true}
                expiration={coupon.expiration}
                availableTime={coupon.availableTime}
                minOrderPrice={coupon.minOrderPrice}
              />
            ))}
          </Modal.Body>
          <Modal.Button
            title={"닫기"}
            onClick={onModalClose}
            size="large"
            styled={{ height: "44px" }}
          />
        </Modal.Frame>
      </Modal.Backdrop>
    </Modal>
  );
};

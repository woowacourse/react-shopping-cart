import { discountAmountState, selectedCouponsState } from "@/store/atoms/atoms";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

import { COUPON_MESSAGE } from "@/constants/message";
import Coupon from "./Coupon";
import { CouponType } from "@/types/coupon.type";
import { FlexRow } from "@/style/common.style";
import Info from "@/assets/Info.svg";
import { MAX_APPLICABLE_COUPON } from "@/constants/system";
import { Modal } from "hain-tain-components";
import { couponState } from "@/store/selectors/dataFetchSelector/dataFetchSelector";
import styled from "@emotion/styled";
import useDiscountSimulator from "@/hooks/useDiscountSimulator";

interface Props {
  isOpened: boolean;
  closeModal: () => void;
}

const CouponModal = ({ isOpened, closeModal }: Props) => {
  const coupons = useRecoilValue(couponState);
  const [tempSelectedCoupons, setTempSelectedCoupons] = useState<CouponType[]>(
    []
  );
  const { calculateDiscountAmount } = useDiscountSimulator();

  const [selectedCoupons, setSelectedCoupons] =
    useRecoilState(selectedCouponsState);
  const setDiscountAmount = useSetRecoilState(discountAmountState);

  const tempDiscount = tempSelectedCoupons.reduce((accAmount, curCoupon) => {
    accAmount = accAmount + calculateDiscountAmount(curCoupon);
    return accAmount;
  }, 0);

  const handleClick = () => {
    setSelectedCoupons(tempSelectedCoupons);
    setDiscountAmount(tempDiscount);
    closeModal();
  };

  useEffect(() => {
    setTempSelectedCoupons(selectedCoupons);
  }, [isOpened]);

  return (
    <Modal
      size="small"
      isOpened={isOpened}
      closeModal={closeModal}
      showCloseButton
      title={COUPON_MESSAGE.chooseCoupon}
      primaryButton={{
        text: COUPON_MESSAGE.applyCoupon(tempDiscount),
        onClick: handleClick,
      }}
    >
      <StyledInfoBox>
        <img src={Info} alt="추가정보" />
        {COUPON_MESSAGE.maxApplicableCoupon(MAX_APPLICABLE_COUPON)}
      </StyledInfoBox>
      <div>
        {coupons.map((coupon) => {
          return (
            <Coupon
              key={coupon.id}
              coupon={coupon}
              selectedCoupons={tempSelectedCoupons}
              setSelectedCoupons={setTempSelectedCoupons}
            />
          );
        })}
      </div>
    </Modal>
  );
};

export default CouponModal;

const StyledInfoBox = styled.div`
  ${FlexRow}
  align-items: flex-start;
  font-size: 12px;
  gap: 5px;
`;

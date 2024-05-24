/** @jsxImportSource @emotion/react */
import { useRecoilValue } from "recoil";
import { useCouponApplicabilityChecker } from "../../hooks/coupons";
import useSelectCoupon from "../../hooks/coupons/useSelectCoupon";
import { cartListTotalPrice } from "../../recoil/selectors";
import { caption } from "../../styles/font";
import { Coupon } from "../../types";
import formatAvailableTime from "../../util/formatAvailableTime";
import formatExpirationDate from "../../util/formatExpirationDate";
import formatPriceToKoreanWon from "../../util/formatPriceToKoreanWon";
import { Divider } from "../CartList/CheckoutSummary/style";
import {
  CouponListDescription,
  CouponListSection,
  CouponListTitle,
} from "../CouponList/style";
import CheckBox from "../common/CheckBox";

interface CouponItemProps {
  coupon: Coupon;
}

const CouponItem: React.FC<CouponItemProps> = ({ coupon }) => {
  const { id, description, expirationDate, minimumAmount, availableTime } =
    coupon;

  const { isCouponSelected, toggleCouponSelected } = useSelectCoupon(id);
  const { isCouponApplicable } = useCouponApplicabilityChecker();
  const totalAmount = useRecoilValue(cartListTotalPrice);
  const isApplicable = isCouponApplicable({ coupon, totalAmount });
  const handleToggle = () => {
    toggleCouponSelected();
  };

  return (
    <div key={id}>
      <Divider />
      <CouponListSection isApplicable={isApplicable}>
        <CouponListTitle>
          <CheckBox
            isSelected={isCouponSelected}
            id={id.toString()}
            toggleSelected={handleToggle}
            isApplicable={isApplicable}
          />
          <h3>{description}</h3>
        </CouponListTitle>
        <CouponListDescription>
          <p css={caption}>만료일 : {formatExpirationDate(expirationDate)}</p>
          {minimumAmount && (
            <p css={caption}>
              최소 주문 금액 : {formatPriceToKoreanWon(minimumAmount)}
            </p>
          )}
          {availableTime && (
            <p css={caption}>
              사용 가능 시간 : {formatAvailableTime(availableTime)}
            </p>
          )}
        </CouponListDescription>
      </CouponListSection>
    </div>
  );
};

export default CouponItem;

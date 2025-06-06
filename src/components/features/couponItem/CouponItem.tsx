import * as S from "./CouponItem.styles";
import Checkbox from "../../@common/checkbox/Checkbox";
import {
  Subtitle,
  Description,
} from "../../../styles/@common/title/Title.styles";
import {
  FORMATTED_DUE_DATE,
  FORMATTED_MINIMUM_AMOUNT,
} from "../../../constants/systemMessages";

interface CouponItemProps {
  description: string;
  dueDate: string;
  minimumAmount?: number;
  isSelected: boolean;
  isValid: boolean;
  onSelectCoupon: () => void;
}

const CouponItem = ({
  description,
  dueDate,
  minimumAmount,
  isSelected,
  isValid,
  onSelectCoupon,
}: CouponItemProps) => {
  const formattedDate = FORMATTED_DUE_DATE(dueDate);
  const formattedMinimumAmount = minimumAmount
    ? FORMATTED_MINIMUM_AMOUNT(minimumAmount)
    : "";

  return (
    <div css={isValid ? S.couponItemContainer : S.couponItemContainerInvalid}>
      <div css={S.couponItemHeader}>
        <Checkbox
          checked={isSelected}
          onChange={onSelectCoupon}
          tabIndex={isValid ? 0 : -1}
          disabled={!isValid}
        />
        <div css={Subtitle}>{description}</div>
      </div>
      <div css={S.couponItemInfoContainer}>
        <div css={Description}>{formattedDate}</div>
        <div css={Description}>{formattedMinimumAmount}</div>
      </div>
    </div>
  );
};

export default CouponItem;

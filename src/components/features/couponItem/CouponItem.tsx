import * as S from "./CouponItem.styles";
import Checkbox from "../../@common/checkbox/Checkbox";
import {
  Subtitle,
  Description,
} from "../../../styles/@common/title/Title.styles";
import {
  getFormattedDueDateMessage,
  getFormattedMinimumAmountMessage,
  getFormattedAvailableTimeMessage,
} from "../../../constants/systemMessages";
import type { AvailableTime } from "../../../types/response";
import { parseHour } from "../../../utils/parseTime";

interface CouponItemInfo {
  dueDate?: string;
  minimumAmount?: number;
  availableTime?: AvailableTime;
}

interface CouponItemProps {
  description: string;
  couponInfo: CouponItemInfo;
  isSelected: boolean;
  isValid: boolean;
  onSelectCoupon: () => void;
}

const CouponItem = ({
  description,
  couponInfo,
  isSelected,
  isValid,
  onSelectCoupon,
}: CouponItemProps) => {
  const parsedDate = couponInfo?.dueDate ? new Date(couponInfo.dueDate) : null;
  const formattedDate =
    parsedDate &&
    getFormattedDueDateMessage(
      parsedDate.getFullYear().toString(),
      (parsedDate.getMonth() + 1).toString(),
      parsedDate.getDate().toString()
    );
  const formattedMinimumAmount =
    couponInfo?.minimumAmount &&
    getFormattedMinimumAmountMessage(couponInfo.minimumAmount);

  const formattedAvailableTime =
    couponInfo?.availableTime &&
    getFormattedAvailableTimeMessage(
      parseHour(couponInfo.availableTime.start),
      parseHour(couponInfo.availableTime.end)
    );

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
        {couponInfo?.dueDate && <div css={Description}>{formattedDate}</div>}
        {couponInfo?.minimumAmount && (
          <div css={Description}>{formattedMinimumAmount}</div>
        )}
        {couponInfo?.availableTime && (
          <div css={Description}>{formattedAvailableTime}</div>
        )}
      </div>
    </div>
  );
};

export default CouponItem;

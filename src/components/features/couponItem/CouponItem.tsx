import * as S from "./CouponItem.styles";
import Checkbox from "../../@common/checkbox/Checkbox";
import {
  Subtitle,
  Description,
} from "../../../styles/@common/title/Title.styles";

interface CouponItemProps {
  name: string;
  dueDate: string;
  minimumOrderPrice: number;
  isSelected: boolean;
}

const CouponItem = ({
  name,
  dueDate,
  minimumOrderPrice,
  isSelected,
}: CouponItemProps) => {
  const parsedDueDate = new Date(dueDate);

  const formattedDate = `만료일: ${parsedDueDate.getFullYear()}년 ${
    parsedDueDate.getMonth() + 1
  }월 ${parsedDueDate.getDate()}일`;

  const formattedMinimumOrderPrice = minimumOrderPrice
    ? `최소주문금액:  ${minimumOrderPrice.toLocaleString()}원`
    : "";

  return (
    <div css={S.couponItemContainer}>
      <div css={S.couponItemHeader}>
        <Checkbox checked={isSelected} onChange={() => {}} />
        <div css={Subtitle}>{name}</div>
      </div>
      <div css={S.couponItemInfoContainer}>
        <div css={Description}>{formattedDate}</div>
        <div css={Description}>{formattedMinimumOrderPrice}</div>
      </div>
    </div>
  );
};

export default CouponItem;

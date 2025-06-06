import * as S from "./CouponItem.styles";
import Checkbox from "../../@common/checkbox/Checkbox";
import {
  Subtitle,
  Description,
} from "../../../styles/@common/title/Title.styles";

interface CouponItemProps {
  name: string;
  dueDate: Date;
  minimumOrderPrice: number;
  isSelected: boolean;
}

const CouponItem = ({
  name,
  dueDate,
  minimumOrderPrice,
  isSelected,
}: CouponItemProps) => {
  const formattedDate = `만료일: ${dueDate.getFullYear()}년 ${
    dueDate.getMonth() + 1
  }월 ${dueDate.getDate()}일`;
  const formattedMinimumOrderPrice = `최소주문금액:  ${minimumOrderPrice.toLocaleString()}원`;

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

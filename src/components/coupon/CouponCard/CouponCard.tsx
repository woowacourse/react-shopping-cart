import { Coupon } from "../../../domains/coupon/types/response";
import {
  formatCurrency,
  formatDate,
  formatTimeRange,
} from "../../../utils/formatters";
import Checkbox from "../../@common/Checkbox/Checkbox";
import * as S from "./CouponCard.styles";

interface Props {
  coupon: Coupon;
  enable: boolean;
  selected: boolean;
  onToggle: (id: number) => void;
}

const CouponCard = ({ coupon, enable, selected, onToggle }: Props) => {
  return (
    <S.CouponCard $disabled={!enable}>
      <S.CouponCardHeader>
        <Checkbox
          selected={selected}
          onClick={() => enable && onToggle(coupon.id)}
          disabled={!enable}
        />
        <S.Title>{coupon.description}</S.Title>
      </S.CouponCardHeader>
      <S.CouponInfo>
        <p>만료일: {formatDate(coupon.expirationDate)}</p>
        {coupon.minimumAmount && (
          <p>최소 주문 금액: {formatCurrency(coupon.minimumAmount)}</p>
        )}
        {coupon.availableTime && (
          <p>
            사용 가능 시간:{" "}
            {formatTimeRange(
              coupon.availableTime.start,
              coupon.availableTime.end
            )}
          </p>
        )}
      </S.CouponInfo>
    </S.CouponCard>
  );
};

export default CouponCard;

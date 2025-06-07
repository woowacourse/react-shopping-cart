import { Coupon } from "../../../domains/coupon/types/response";
import { formatDate, formatTimeRange } from "../../../utils/formatters";
import Checkbox from "../../@common/Checkbox/Checkbox";
import * as S from "./CouponCard.styles";

interface Props {
  coupon: Coupon;
}

const CouponCard = ({ coupon }: Props) => {
  return (
    <S.CouponCard>
      <S.CouponCardHeader>
        <Checkbox selected={false} onClick={() => {}} />
        <S.Title>{coupon.description}</S.Title>
      </S.CouponCardHeader>
      <S.CouponInfo>
        <p>만료일: {formatDate(coupon.expirationDate)}</p>
        {coupon.minimumAmount && (
          <p>최소 주문 금액: {coupon.minimumAmount.toLocaleString()}원</p>
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

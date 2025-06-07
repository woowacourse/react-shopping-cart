import { Coupon } from "../../../domains/coupon/types/response";
import Checkbox from "../../@common/Checkbox/Checkbox";
import * as S from "./CouponCard.styles";

interface Props {
  coupon: Coupon;
}

// TODO: 만료일 파싱 (XXXX년 XX월 XX일)
// TODO: 사용 가능 기간 파싱 (오전 X시부터 오후 X시까지)

const CouponCard = ({ coupon }: Props) => {
  return (
    <S.CouponCard>
      <S.CouponCardHeader>
        <Checkbox selected={false} onClick={() => {}} />
        <S.Title>{coupon.description}</S.Title>
      </S.CouponCardHeader>
      <S.CouponInfo>
        <p>만료일: {coupon.expirationDate}</p>
        {coupon.minimumAmount && (
          <p>최소 주문 금액: {coupon.minimumAmount.toLocaleString()}원</p>
        )}
        {coupon.availableTime && (
          <p>
            사용 가능 시간: {coupon.availableTime.start}-
            {coupon.availableTime.end}
          </p>
        )}
      </S.CouponInfo>
    </S.CouponCard>
  );
};

export default CouponCard;

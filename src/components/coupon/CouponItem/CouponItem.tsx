import { Coupon } from "../../../types/response/coupon";
import Checkbox from "../../@common/Checkbox/Checkbox";
import * as S from "./CouponItem.styles";

interface Props {
  item: Coupon;
}

// TODO: 만료일 파싱 (XXXX년 XX월 XX일)
// TODO: 사용 가능 기간 파싱 (오전 X시부터 오후 X시까지)

const CouponItem = ({ item }: Props) => {
  return (
    <S.CouponItem>
      <S.CouponItemHeader>
        <Checkbox selected={false} onClick={() => {}} />
        <S.Title>{item.description}</S.Title>
      </S.CouponItemHeader>
      <S.CouponInfo>
        <p>만료일: {item.expirationDate}</p>
        {item.minimumAmount && (
          <p>최소 주문 금액: {item.minimumAmount.toLocaleString()}원</p>
        )}
        {item.availableTime && (
          <p>
            사용 가능 시간: {item.availableTime.start}-{item.availableTime.end}
          </p>
        )}
      </S.CouponInfo>
    </S.CouponItem>
  );
};

export default CouponItem;

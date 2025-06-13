import * as S from "./Coupon.styles";
import Line from "../../../common/Line";
import CheckBox from "../../../common/CheckBox";
import { CouponResponse } from "../../../../type/coupon";
import { formatPrice } from "../../../../utils/formatPrice";
import { formatDate, formatAvailableTime } from "./\butils";

interface Props {
  coupon: CouponResponse;
  isChecked: boolean;
  onSelect: (id: number) => void;
  isValid: boolean;
}

const Coupon = ({ coupon, isChecked, onSelect, isValid }: Props) => {
  const { id, description, expirationDate } = coupon;
  return (
    <>
      <Line />
      <S.Container>
        <S.CouponTop>
          <CheckBox
            isChecked={isChecked}
            onChange={() => onSelect(id)}
            disabled={!isValid}
          />
          <S.Name disabled={!isValid}>{description}</S.Name>
        </S.CouponTop>

        <S.CouponBottom>
          {expirationDate && (
            <S.Info disabled={!isValid}>
              만료일: {formatDate(expirationDate)}
            </S.Info>
          )}
          {"minimumAmount" in coupon && (
            <S.Info disabled={!isValid}>
              최소 주문 금액: {formatPrice(Number(coupon.minimumAmount))}
            </S.Info>
          )}
          {"availableTime" in coupon && (
            <S.Info disabled={!isValid}>
              사용 가능 시간:
              {formatAvailableTime(
                coupon.availableTime.start,
                coupon.availableTime.end
              )}
            </S.Info>
          )}
        </S.CouponBottom>
      </S.Container>
    </>
  );
};

export default Coupon;

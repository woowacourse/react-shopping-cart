import * as S from "./Coupon.styles";
import Line from "../../../common/Line";
import CheckBox from "../../../common/CheckBox";
import { CouponResponse } from "../../../../type/coupon";
import { formatPrice } from "../../../../utils/formatPrice";

interface Props {
  coupon: CouponResponse;
  isChecked: boolean;
  onSelect: (id: number) => void;
}

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // 0-based
  const day = date.getDate();

  return `${year}년 ${month}월 ${day}일`;
};

const formatAvailableTime = (start: string, end: string): string => {
  const getHourInfo = (time: string) => {
    const [hourStr] = time.split(":");
    const hour = parseInt(hourStr, 10);

    const period = hour < 12 ? "오전" : "오후";
    const formattedHour = hour % 12 === 0 ? 12 : hour % 12;

    return { period, hour: formattedHour };
  };

  const startInfo = getHourInfo(start);
  const endInfo = getHourInfo(end);

  if (startInfo.period === endInfo.period) {
    return `${startInfo.period} ${startInfo.hour}시부터 ${endInfo.hour}시까지`;
  }

  return `${startInfo.period} ${startInfo.hour}시부터 ${endInfo.period} ${endInfo.hour}시까지`;
};

const Coupon = ({
  coupon: { id, description, expirationDate, minimumAmount, availableTime },
  isChecked,
  onSelect,
}: Props) => {
  return (
    <>
      <Line />
      <S.Container>
        <S.CouponTop>
          <CheckBox isChecked={isChecked} onChange={() => onSelect(id)} />
          <S.Name>{description}</S.Name>
        </S.CouponTop>

        <S.CouponBottom>
          {expirationDate && (
            <S.Info>만료일: {formatDate(expirationDate)}</S.Info>
          )}
          {minimumAmount && (
            <S.Info>
              최소 주문 금액: {formatPrice(Number(minimumAmount))}
            </S.Info>
          )}
          {availableTime && (
            <S.Info>
              사용 가능 시간:
              {formatAvailableTime(availableTime.start, availableTime.end)}
            </S.Info>
          )}
        </S.CouponBottom>
      </S.Container>
    </>
  );
};

export default Coupon;

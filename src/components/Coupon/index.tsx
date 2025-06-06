import formatTime from "../../utils/\bcoupon/formatTime";
import Text from "../common/Text";
import * as S from "./Coupon.styled";

interface CouponProps {
  children: React.ReactNode;
  direction?: "row" | "column";
  gap?: number;
}

interface AvailableTimeProps {
  start: string;
  end: string;
}

const Coupon = ({ children, direction = "column", gap = 0 }: CouponProps) => {
  return (
    <S.ListItem direction={direction} gap={gap}>
      {children}
    </S.ListItem>
  );
};

Coupon.Information = ({
  children,
  direction = "row",
  gap = 0,
}: {
  children: React.ReactNode;
  direction?: "row" | "column";
  gap?: number;
}) => {
  return (
    <S.Information direction={direction} gap={gap}>
      {children}
    </S.Information>
  );
};

Coupon.Title = ({ title }: { title: string }) => {
  return <Text variant="title-2">{title}</Text>;
};

Coupon.ExpirationDate = ({ date }: { date: string }) => {
  const parsedDate = new Date(date);

  const year = parsedDate.getFullYear();
  const month = parsedDate.getMonth() + 1;
  const day = parsedDate.getDate();
  const formattedDate = `${year}년 ${month}월 ${day}일`;

  return <Text variant="body-3">만료일: {formattedDate}</Text>;
};

Coupon.MinimumAmount = ({ amount }: { amount: number }) => {
  return <Text variant="body-3"> 최소 주문 금액: {amount.toLocaleString()}원</Text>;
};

Coupon.AvailableTime = ({ start, end }: AvailableTimeProps) => {
  return (
    <Text variant="body-3">
      사용 가능 시간: {formatTime(start)}부터 {formatTime(end)}까지
    </Text>
  );
};

export default Coupon;

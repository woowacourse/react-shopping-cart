import formatTime from "../../../pages/order/utils/coupon/formatTime";
import Text from "../common/Text";
import * as S from "./Coupon.styled";
import { createContext, useContext } from "react";

interface CouponContextType {
  disabled: boolean;
}

const CouponContext = createContext<CouponContextType>({ disabled: false });

interface CouponProps {
  children: React.ReactNode;
  direction?: "row" | "column";
  gap?: number;
  disabled?: boolean;
}

interface AvailableTimeProps {
  start: string;
  end: string;
}

const Coupon = ({ children, direction = "column", gap = 0, disabled = false }: CouponProps) => {
  return (
    <CouponContext.Provider value={{ disabled }}>
      <S.ListItem direction={direction} gap={gap} disabled={disabled}>
        {children}
      </S.ListItem>
    </CouponContext.Provider>
  );
};

const Information = ({
  children,
  direction = "row",
  gap = 0,
}: {
  children: React.ReactNode;
  direction?: "row" | "column";
  gap?: number;
}) => {
  const { disabled } = useContext(CouponContext);
  return (
    <S.Information direction={direction} gap={gap} disabled={disabled}>
      {children}
    </S.Information>
  );
};

const Title = ({ title }: { title: string }) => {
  const { disabled } = useContext(CouponContext);
  return (
    <Text variant="title-2" style={{ opacity: disabled ? 0.5 : 1 }}>
      {title}
    </Text>
  );
};

const ExpirationDate = ({ date }: { date: string }) => {
  const { disabled } = useContext(CouponContext);
  const parsedDate = new Date(date);

  const year = parsedDate.getFullYear();
  const month = parsedDate.getMonth() + 1;
  const day = parsedDate.getDate();
  const formattedDate = `${year}년 ${month}월 ${day}일`;

  return (
    <Text variant="body-3" style={{ opacity: disabled ? 0.5 : 1 }}>
      만료일: {formattedDate}
    </Text>
  );
};

const MinimumAmount = ({ amount }: { amount: number }) => {
  const { disabled } = useContext(CouponContext);
  return (
    <Text variant="body-3" style={{ opacity: disabled ? 0.5 : 1 }}>
      {" "}
      최소 주문 금액: {amount.toLocaleString()}원
    </Text>
  );
};

const AvailableTime = ({ start, end }: AvailableTimeProps) => {
  const { disabled } = useContext(CouponContext);
  return (
    <Text variant="body-3" style={{ opacity: disabled ? 0.5 : 1 }}>
      사용 가능 시간: {formatTime(start)}부터 {formatTime(end)}까지
    </Text>
  );
};

Coupon.Information = Information;
Coupon.Title = Title;
Coupon.ExpirationDate = ExpirationDate;
Coupon.MinimumAmount = MinimumAmount;
Coupon.AvailableTime = AvailableTime;

export default Coupon;

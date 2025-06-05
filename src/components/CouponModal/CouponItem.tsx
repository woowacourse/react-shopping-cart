import { css } from "@emotion/css";
import { AvailableTime, Expiration } from "../../types/type";
import ToggleButton from "../@common/Button/ToggleButton/ToggleButton";
import Text from "../@common/Text/Text";

interface CouponItemProps {
  name: string;
  expiration: Expiration;
  minOrderPrice?: number;
  isSelected: boolean;
  availableTime?: AvailableTime;
}
export const CouponItem = ({
  name,
  expiration,
  minOrderPrice,
  availableTime,
  isSelected,
}: CouponItemProps) => {
  return (
    <div className={CouponItemStyle}>
      <hr className={Divider} />
      <div className={RowStyle}>
        <ToggleButton isSelected={isSelected} />
        <Text text={name} type="medium" />
      </div>
      {expiration && (
        <div className={RowStyle}>
          <Text text="만료일:" />
          <Text
            text={`${expiration.year}년 ${expiration.month}월 ${expiration.date}일`}
          />
        </div>
      )}
      {minOrderPrice && (
        <div className={RowStyle}>
          <Text text="최소 주문 금액:" />
          <Text text={`${minOrderPrice.toLocaleString()}원`} />
        </div>
      )}
      {availableTime && (
        <div className={RowStyle}>
          <Text text="사용 가능 시간:" />
          <Text text={`${availableTime.start}부터 ${availableTime.end}까지`} />
        </div>
      )}
    </div>
  );
};

const CouponItemStyle = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 24px;
`;

const Divider = css`
  border: 0.5px solid #e0e0e0;
`;

const RowStyle = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

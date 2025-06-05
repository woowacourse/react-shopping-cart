import { css } from "@emotion/css";
import ToggleButton from "../@common/Button/ToggleButton/ToggleButton";
import Text from "../@common/Text/Text";
import { AvailableTime } from "../../types/type";

interface CouponItemProps {
  name: string;
  expiration: string;
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
  const parsedExpiration = (expiration: string) => {
    return expiration.split("-");
  };

  const [year, month, date] = parsedExpiration(expiration);

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
          <Text text={`${year}년 ${month}월 ${date}일`} />
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
          <Text
            text={`${availableTime.start.split(":")[0]}부터 ${
              availableTime.end.split(":")[0]
            }까지`}
          />
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

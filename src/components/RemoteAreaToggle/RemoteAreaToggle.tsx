import { css } from "@emotion/css";
import ToggleButton from "../@common/Button/ToggleButton/ToggleButton";
import Text from "../@common/Text/Text";

interface RemoteAreaToggleProps {
  isRemoteArea: boolean;
  handleToggle: () => void;
}

export const RemoteAreaToggle = ({
  isRemoteArea,
  handleToggle,
}: RemoteAreaToggleProps) => {
  return (
    <section className={RemoteAreaToggleStyle}>
      <Text text="배송 정보" type="medium" />
      <div className={ShippingToggleStyle}>
        <ToggleButton
          isSelected={isRemoteArea}
          onClick={() => handleToggle()}
        />
        <Text text="제주도 및 도서 산간 지역" />
      </div>
    </section>
  );
};

const ShippingToggleStyle = css`
  margin-top: 10px;
  display: flex;
  gap: 5px;
  align-items: center;
`;

const RemoteAreaToggleStyle = css`
  padding: 32px 0 0 0;
`;

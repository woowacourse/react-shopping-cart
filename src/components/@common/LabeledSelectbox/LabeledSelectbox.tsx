import { css } from "@emotion/css";
import Selectbox from "../Selectbox/Selectbox";
import Text from "../Text/Text";

interface LabeledSelectboxProps {
  labelText: string;
  isSelected: boolean;
  onClick: () => void;
  textType?: "small" | "medium" | "large";
  testId?: string;
}

const LabeledSelectbox = ({
  labelText,
  isSelected,
  onClick,
  textType = "small",
  testId,
}: LabeledSelectboxProps) => {
  return (
    <div className={containerStyle}>
      <Selectbox isSelected={isSelected} onClick={onClick} testId={testId} />
      <Text text={labelText} type={textType} />
    </div>
  );
};

export default LabeledSelectbox;

const containerStyle = css`
  display: flex;
  gap: 8px;
  align-items: center;
  margin: 10px 0 15px;
`;

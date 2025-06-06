import { css } from "@emotion/css";
import Checkbox from "../Checkbox/Checkbox";
import Text from "../Text/Text";

interface LabeledCheckboxProps {
  labelText: string;
  isSelected: boolean;
  onClick: () => void;
  textType?: "small" | "medium" | "large";
  testId?: string;
}

const LabeledCheckbox = ({
  labelText,
  isSelected,
  onClick,
  textType = "small",
  testId,
}: LabeledCheckboxProps) => {
  return (
    <div className={containerStyle}>
      <Checkbox isSelected={isSelected} onClick={onClick} testId={testId} />
      <Text text={labelText} type={textType} />
    </div>
  );
};

export default LabeledCheckbox;

const containerStyle = css`
  display: flex;
  gap: 8px;
  align-items: center;
  margin: 10px 0 15px;
`;

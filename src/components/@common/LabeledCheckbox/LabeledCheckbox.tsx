import { css } from "@emotion/css";
import Checkbox from "../Checkbox/Checkbox";
import Text from "../Text/Text";

interface LabeledCheckboxProps {
  label: string;
  isSelected: boolean;
  onClick: () => void;
  textType?: "small" | "medium" | "large";
  testId?: string;
}

const LabeledCheckbox = ({
  label,
  isSelected,
  onClick,
  textType = "small",
  testId,
}: LabeledCheckboxProps) => {
  return (
    <div className={containerStyle}>
      <Checkbox isSelected={isSelected} onClick={onClick} testId={testId} />
      <Text text={label} type={textType} />
    </div>
  );
};

export default LabeledCheckbox;

const containerStyle = css`
  display: flex;
  gap: 8px;
  align-items: center;
  margin-bottom: 15px;
`;

import styled from "styled-components";
import { FaCheck } from "react-icons/fa";

type CheckBoxProps = {
  isChecked: boolean;
  onCheckedChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const CheckBox = ({ isChecked, onCheckedChange }: CheckBoxProps) => {
  return (
    <label>
      <CheckBoxInput
        type="checkbox"
        checked={isChecked}
        onChange={onCheckedChange}
      />
      <FakeCheckBox>
        <CheckIcon />
      </FakeCheckBox>
    </label>
  );
};

const colors = {
  gold: "#ffff7f",
};

const CheckBoxInput = styled.input`
  width: 26px;
  height: 26px;
  border: 2px solid ${colors.gold};
  display: none;
`;

const FakeCheckBox = styled.div`
  width: 26px;
  height: 26px;
  border: 2px solid ${colors.gold};
  transition: 0.3s;
  cursor: pointer;

  ${CheckBoxInput}:checked + & {
    background-color: ${colors.gold};
    box-shadow: 0 0 9px ${colors.gold};
  }
`;

const CheckIcon = styled(FaCheck)`
  font-size: 18px;
  opacity: 0;
  transition: 0.3s;
  line-height: 18px;
  margin: 2px;

  ${CheckBoxInput}:checked + ${FakeCheckBox} > & {
    opacity: 1;
  }
`;

export default CheckBox;

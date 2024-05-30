import Checked from "@/assets/checked.svg?react";
import NotChecked from "@/assets/not-checked.svg?react";

interface CheckBoxProps {
  isChecked: boolean;
  onClick: () => void;
  id?: string;
  disabled?: boolean;
}

const CheckBox = ({ isChecked, onClick, id, disabled }: CheckBoxProps) => {
  return (
    <button onClick={onClick} role="checkbox" id={id} disabled={disabled}>
      {isChecked ? <Checked /> : <NotChecked />}
    </button>
  );
};

export default CheckBox;

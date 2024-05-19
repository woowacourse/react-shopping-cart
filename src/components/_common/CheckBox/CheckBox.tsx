import Checked from "@/assets/checked.svg?react";
import NotChecked from "@/assets/not-checked.svg?react";

interface CheckBoxProps {
  isChecked: boolean;
  onClick: () => void;
}

const CheckBox = ({ isChecked, onClick }: CheckBoxProps) => {
  return (
    <button onClick={onClick} role="checkbox">
      {isChecked ? <Checked /> : <NotChecked />}
    </button>
  );
};

export default CheckBox;

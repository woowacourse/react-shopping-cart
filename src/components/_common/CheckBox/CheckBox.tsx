import Checked from "@/assets/checked.svg?react";
import NotChecked from "@/assets/not-checked.svg?react";

interface CheckBoxProps {
  isChecked: boolean;
  onClick: () => void;
  id?: string;
}

const CheckBox = ({ isChecked, onClick, id }: CheckBoxProps) => {
  return (
    <button onClick={onClick} role="checkbox" id={id}>
      {isChecked ? <Checked /> : <NotChecked />}
    </button>
  );
};

export default CheckBox;

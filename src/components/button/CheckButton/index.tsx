import Button from "@/components/_common/Button";
import FilledCheck from "@/assets/icons/FilledCheck";
import OutlineCheck from "@/assets/icons/OutlineCheck";

interface CheckButtonProps {
  isChecked: boolean;
  onToggle: () => void;
}

const CheckButton = ({ isChecked, onToggle }: CheckButtonProps) => {
  return (
    <Button $borderRadius="8px" onClick={onToggle}>
      {isChecked ? <FilledCheck color="white" /> : <OutlineCheck />}
    </Button>
  );
};

export default CheckButton;

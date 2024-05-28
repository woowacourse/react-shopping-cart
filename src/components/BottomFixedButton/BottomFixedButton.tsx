import Button from "../_common/Button/Button";
import Styled from "./BottomFixedButton.styles";

interface BottomFixedButtonProps {
  buttonText: string;
  disabled?: boolean;
  onClick?: () => void;
}

const BottomFixedButton = ({
  buttonText,
  disabled = false,
  ...props
}: BottomFixedButtonProps) => {
  return (
    <Styled.BottomFixedButton>
      <Button
        width="full"
        size="xLarge"
        theme="dark"
        disabled={disabled}
        {...props}
      >
        <Styled.ButtonText>{buttonText}</Styled.ButtonText>
      </Button>
    </Styled.BottomFixedButton>
  );
};

export default BottomFixedButton;

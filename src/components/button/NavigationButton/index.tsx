import Button from "@/components/_common/Button";
import { isAnyCartItemSelectedState } from "@/stores/cartItemSelections";
import { cartItemsState } from "@/stores/cartItems";
import { useRecoilValue } from "recoil";

interface NavigateButtonProps {
  buttonText: string;
  onButtonClick: () => void;
}

const NavigationButton = ({
  buttonText,
  onButtonClick,
}: NavigateButtonProps) => {
  const cartItemCount = useRecoilValue(cartItemsState).length;
  const isAnyCartItemSelected = useRecoilValue(isAnyCartItemSelectedState);

  const isDisabled = cartItemCount === 0 || !isAnyCartItemSelected;

  return (
    <Button
      onClick={onButtonClick}
      $theme={isDisabled ? "disabled" : "black"}
      $width="100%"
      $height="64px"
      $borderRadius="0"
      disabled={isDisabled}
    >
      {buttonText}
    </Button>
  );
};

export default NavigationButton;

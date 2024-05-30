import { useRecoilValue } from "recoil";
import { isAnyCartItemSelectedState } from "@/stores/cartItemSelections";
import useCartItems from "@/hooks/carts/useCartItems";
import Button from "@/components/_common/Button";

interface NavigateButtonProps {
  buttonText: string;
  onButtonClick: () => void;
}

const NavigationButton = ({
  buttonText,
  onButtonClick,
}: NavigateButtonProps) => {
  const { cartItemCount } = useCartItems();
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

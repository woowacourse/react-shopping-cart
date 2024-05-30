import Button from "@/components/_common/Button";

interface QuantityButtonProps {
  quantity: number;
  onClick: () => void;
}

interface PlusButtonProps extends QuantityButtonProps {
  max?: number;
}

interface MinusButtonProps extends QuantityButtonProps {
  min?: number;
}

export const PlusButton = ({ max, quantity, onClick }: PlusButtonProps) => {
  const isDisabled = max ? quantity >= max : false;

  return (
    <Button
      onClick={onClick}
      disabled={isDisabled}
      $theme={isDisabled ? "disabled" : "white"}
      $width="24px"
      $height="24px"
    >
      +
    </Button>
  );
};

export const MinusButton = ({
  min = 1,
  quantity,
  onClick,
}: MinusButtonProps) => {
  const isDisabled = quantity <= min;

  return (
    <Button
      onClick={onClick}
      disabled={isDisabled}
      $theme={isDisabled ? "disabled" : "white"}
      $width="24px"
      $height="24px"
    >
      -
    </Button>
  );
};

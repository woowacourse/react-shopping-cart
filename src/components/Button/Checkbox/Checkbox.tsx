import { COLOR_PALETTE } from "@/colorPalette";
import Button from "@/components/Button/Button";

interface CheckImageProps {
  width: number;
  height: number;
  isCheck: boolean;
}

interface CheckboxProps {
  isCheck: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

const CheckImage = ({ width, height, isCheck }: CheckImageProps) => {
  const DATA = "M5.88425 11.17L1.71425 7L0.29425 8.41L5.88425 14L17.8843 2L16.4743 0.589996L5.88425 11.17Z";

  const CHECK_PATH_INFO = (isCheck: boolean) => ({
    d: DATA,
    fill: isCheck ? COLOR_PALETTE.white : COLOR_PALETTE.black,
    fillOpacity: isCheck ? "1" : "0.1",
  });

  return (
    <svg
      width={`${width}px`}
      height={`${height}px`}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path {...CHECK_PATH_INFO(isCheck)} />
    </svg>
  );
};

const Checkbox = ({ isCheck, onClick, disabled }: CheckboxProps) => {
  return (
    <Button onClick={onClick} isHighlight={isCheck} disabled={disabled}>
      <CheckImage width={14} height={14} isCheck={isCheck} />
    </Button>
  );
};

export default Checkbox;

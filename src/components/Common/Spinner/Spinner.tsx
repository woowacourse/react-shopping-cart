import { spinnerLayout } from './Spinner.style';

interface SpinnerProps {
  size?: number;
  color?: string;
}

export function Spinner({ size = 24, color = 'black' }: SpinnerProps) {
  return <div css={spinnerLayout(size, color)} />;
}

import { SpinnerContainer } from './Spinner.styles';

interface SpinnerProps {
  scale?: string;
}

const Spinner = ({ scale = '1.0' }: SpinnerProps) => (
  <SpinnerContainer scale={scale} />
);

export default Spinner;
export type { SpinnerProps };

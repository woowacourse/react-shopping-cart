import * as Styled from './LoadingSpinner.styled';

interface SpinnerProps {
  diameter?: string;
  spinnerWidth?: string;
  color?: string;
}

const LoadingSpinner = (props: SpinnerProps) => {
  const { diameter, spinnerWidth, color } = props;

  return (
    <Styled.SpinnerDiv
      style={{
        width: diameter ?? '77px',
        height: diameter ?? '77px',
        borderWidth: spinnerWidth ?? '7px',
        borderTopColor: color ?? 'hotpink',
      }}
    />
  )
};

export default LoadingSpinner;

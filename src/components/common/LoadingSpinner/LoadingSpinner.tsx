import * as Styled from './LoadingSpinner.styled';
interface Props {
  $width: string;
  $height: string;
}

const LoadingSpinner = ({ $width, $height }: Props) => {
  return (
    <Styled.LoadingSpinnerWrapper $height={$height} $width={$width}>
      <Styled.LoadingSpinner />
    </Styled.LoadingSpinnerWrapper>
  );
};

export default LoadingSpinner;

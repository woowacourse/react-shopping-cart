import Spinner, { SpinnerProps } from '../Spinner/Spinner';
import * as S from './SpinnerContainer.styles';

interface SpinnerContainerProps extends SpinnerProps {
  message?: string;
}

const SpinnerContainer = ({ message, ...spinner }: SpinnerContainerProps) => {
  return (
    <S.SpinnerContainer>
      <Spinner {...spinner} />
      {message && <S.SpinnerMessage size="large">{message}</S.SpinnerMessage>}
    </S.SpinnerContainer>
  );
};

export default SpinnerContainer;

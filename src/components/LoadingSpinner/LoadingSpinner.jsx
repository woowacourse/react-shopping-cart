import * as S from './LoadingSpinner.styles';
import { Spinner } from 'components/@common';
import { FRUITS } from 'constants';

function LoadingSpinner() {
  return (
    <S.LoadingSpinnner>
      {FRUITS.map(fruit => (
        <Spinner key={fruit}>
          <S.FruitIcon>{fruit}</S.FruitIcon>
        </Spinner>
      ))}
    </S.LoadingSpinnner>
  );
}

export default LoadingSpinner;

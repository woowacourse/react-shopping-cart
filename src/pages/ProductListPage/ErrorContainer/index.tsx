import { ErrorImg } from '@Styles/common/ErrorImg';
import { ErrorMessage } from '@Styles/common/ErrorMessage';

import { Error } from '@Types/index';

import * as S from './style';

type ErrorContainerProps = {
  error: Error;
};

function ErrorContainer({ error }: ErrorContainerProps) {
  const { message, imgSrc, imgAlt } = error;

  return (
    <S.ErrorContainer>
      <ErrorImg src={imgSrc} alt={imgAlt} />
      <ErrorMessage>{message}</ErrorMessage>
    </S.ErrorContainer>
  );
}
export default ErrorContainer;

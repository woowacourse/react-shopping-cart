import * as S from './ErrorContainer.styled';
import ErrorImage from '@assets/icons/error.png';

export default function ErrorContainer({ errorMessage }: { errorMessage: string }) {
  return (
    <S.Container>
      <S.Image src={ErrorImage} alt="error" />
      {errorMessage}
    </S.Container>
  );
}

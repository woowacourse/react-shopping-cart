import { To, useNavigate } from 'react-router-dom';
import ArrowIcon from '../../../assets/arrowIcon.png';
import HeaderLogo from '../../../assets/headerLogo.png';
import * as S from './style';

export function HomeButton() {
  return (
    <HeaderButton destination={'/'} imageUrl={HeaderLogo} alt="Shop 로고" />
  );
}

export function BackButton() {
  return (
    <HeaderButton
      destination={-1}
      imageUrl={ArrowIcon}
      alt="왼쪽 화살표 로고"
    />
  );
}

function HeaderButton({
  imageUrl,
  alt,
  destination,
}: {
  imageUrl: string;
  alt: string;
  destination: To | number;
}) {
  const navigate = useNavigate();

  const moveToDestination = () => {
    if (typeof destination === 'number') {
      return navigate(destination);
    }
    navigate(destination);
  };

  return (
    <S.HomeButton onClick={moveToDestination} type="button">
      <img src={imageUrl} alt={alt} />
    </S.HomeButton>
  );
}

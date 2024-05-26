import Logo from '../../assets/logo.svg';
import Arrow from '../../assets/arrow.svg';

import * as S from './Header.style';

type ImgType = 'logo' | 'arrow';

interface HeaderProps {
  imgType?: ImgType;
  onClick?: () => void;
}

export default function Header({ imgType, onClick }: HeaderProps) {
  return (
    <S.Section>
      {imgType === 'logo' && <img src={Logo} alt="로고" className="header_logo" onClick={onClick} />}
      {imgType === 'arrow' && <img src={Arrow} alt="뒤로가기" className="header_arrow" onClick={onClick} />}
    </S.Section>
  );
}

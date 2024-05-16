import { HeaderStyle } from './Header.style';
import Logo from '../../assets/logo.svg';
import Arrow from '../../assets/arrow.svg';

type ImgType = 'logo' | 'arrow';

interface HeaderProps {
  imgType: ImgType;
  onClick: () => void;
}

export default function Header({ imgType, onClick }: HeaderProps) {
  return (
    <HeaderStyle onClick={onClick}>
      {imgType === 'logo' && (
        <img src={Logo} alt="로고" className="header_logo" />
      )}
      {imgType === 'arrow' && (
        <img src={Arrow} alt="뒤로가기" className="header_arrow" />
      )}
    </HeaderStyle>
  );
}

import { HeaderStyle } from './Header.style';
import Logo from '../../assets/logo.svg';
import Arrow from '../../assets/arrow.svg';

type ImgType = 'logo' | 'arrow';

export default function Header({ imgType }: { imgType: ImgType }) {
  return (
    <HeaderStyle>
      {imgType === 'logo' && (
        <img src={Logo} alt="로고" className="header_logo" />
      )}
      {imgType === 'arrow' && (
        <img src={Arrow} alt="뒤로가기" className="header_arrow" />
      )}
    </HeaderStyle>
  );
}

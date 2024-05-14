import * as S from './Header.style';

import BACK from '../../assets/chevron-back.svg';

type HeaderType = 'logo' | 'back';

interface HeaderProps {
  type?: HeaderType;
}

const Header = ({ type = 'logo' }: HeaderProps) => {
  return (
    <S.Header>
      <S.Prefix>{type === 'logo' ? <S.Logo>SHOP</S.Logo> : <S.SvgContainer src={BACK} />}</S.Prefix>
      <S.Suffix></S.Suffix>
    </S.Header>
  );
};

export default Header;

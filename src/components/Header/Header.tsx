import * as S from './Header.style';

import BACK from '../../assets/chevron-back.svg';
import { useNavigate } from 'react-router-dom';

type HeaderType = 'logo' | 'back';

interface HeaderProps {
  type?: HeaderType;
}

const Header = ({ type = 'logo' }: HeaderProps) => {
  const navigate = useNavigate();

  return (
    <S.Header>
      <S.PrefixButton onClick={type === 'back' ? () => navigate(-1) : () => {}}>
        {type === 'logo' ? (
          <S.Logo>SHOP</S.Logo>
        ) : (
          <S.SvgContainer src={BACK} alt="chevron-back" />
        )}
      </S.PrefixButton>
    </S.Header>
  );
};

export default Header;

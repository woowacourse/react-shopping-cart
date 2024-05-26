import { useNavigate } from 'react-router-dom';

import * as S from './Header.style';
import BACK from '../../assets/chevron-back.svg?react';

type HeaderType = 'logo' | 'back' | null;

interface HeaderProps {
  type?: HeaderType;
}

const Header = ({ type = 'logo' }: HeaderProps) => {
  const navigate = useNavigate();

  return (
    <S.Header>
      <S.PrefixButton onClick={() => navigate('/')}>
        {type === 'logo' ? (
          <S.Logo>SHOP</S.Logo>
        ) : type === 'back' ? (
          <BACK className="icon-small" />
        ) : null}
      </S.PrefixButton>
    </S.Header>
  );
};

export default Header;

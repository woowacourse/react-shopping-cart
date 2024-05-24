import { useNavigate } from 'react-router-dom';

import * as S from './Header.style';
import BACK from '../../assets/chevron-back.svg?react';

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
          <BACK className="icon-small" />
        )}
      </S.PrefixButton>
    </S.Header>
  );
};

export default Header;

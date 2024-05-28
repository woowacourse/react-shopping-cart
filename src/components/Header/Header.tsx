import * as S from './Header.style';

import BACK from '../../assets/chevron-back.svg';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';

type HeaderType = 'logo' | 'back';

interface HeaderProps {
  type?: HeaderType;
}

const Header = ({ type = 'logo' }: HeaderProps) => {
  const navigate = useNavigate();

  return (
    <S.Header>
      <S.PrefixButton onClick={() => navigate(ROUTES.CART_ORDERS)}>
        {type === 'logo' ? <S.Logo>SHOP</S.Logo> : <S.SvgContainer src={BACK} alt="뒤로 가기" />}
      </S.PrefixButton>
      <S.Suffix></S.Suffix>
    </S.Header>
  );
};

export default Header;

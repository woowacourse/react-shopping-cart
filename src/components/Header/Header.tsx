import { useMatch, useNavigate } from 'react-router-dom';
import * as S from './styled';
import { ROUTER_URLS } from '../../constants/constants';
import back from '../../assets/back.svg';

const Header = () => {
  const matchOrderInfo = useMatch(ROUTER_URLS.ORDER_INFO);
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  return (
    <S.Header>
      {matchOrderInfo !== null ? <S.Undo src={back} alt="undo" onClick={goBack} /> : '쇼핑하기'}
    </S.Header>
  );
};

export default Header;

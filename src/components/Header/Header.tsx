import { ROUTER_URL } from '../../constants/constants';
import back from '../../assets/back.svg';
import { useMatch, useNavigate } from 'react-router-dom';
import * as S from './styled';

const Header = () => {
  const matchOrderInfo = useMatch(ROUTER_URL.ORDER_INFO);
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  return (
    <S.Header>
      {matchOrderInfo !== null ? (
        <img src={back} alt="" onClick={goBack} style={{ cursor: 'pointer' }} />
      ) : (
        '쇼핑하기'
      )}
    </S.Header>
  );
};

export default Header;

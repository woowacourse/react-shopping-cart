import { ROUTER_URL } from '../../constants/constants';
import back from '../../assets/back.svg';
import { useMatch, useNavigate } from 'react-router-dom';
import * as S from './styled';

const Header = () => {
  const isMatchOrderInfo = useMatch(ROUTER_URL.ORDER_INFO);
  const isMatchPaymentInfo = useMatch(ROUTER_URL.PAYMENT_INFO);
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  return (
    <S.Header>
      {isMatchOrderInfo ? (
        <S.Button onClick={goBack}>
          <img src={back} alt="GoToBack"></img>
        </S.Button>
      ) : isMatchPaymentInfo ? (
        ''
      ) : (
        '쇼핑하기'
      )}
    </S.Header>
  );
};

export default Header;

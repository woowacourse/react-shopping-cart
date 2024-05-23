import { useLocation, useNavigate } from 'react-router-dom';
import * as Styled from './style';
import MESSAGE from '../../constants/Message';
import CONDITION from '../../constants/Condition';

const Header = () => {
  const location = useLocation();
  const navigator = useNavigate();

  const title = () => {
    switch (location.pathname) {
      case CONDITION.shoppingCartPage:
        return MESSAGE.shop;
      case CONDITION.orderConfirmationPage:
        return MESSAGE.backSpace;
      default:
        return '';
    }
  };

  const handleOnClick = () => {
    switch (location.pathname) {
      case CONDITION.shoppingCartPage:
        return navigator(CONDITION.shoppingCartPage);
      case CONDITION.orderConfirmationPage:
        return navigator(CONDITION.shoppingCartPage);
      default:
        return '';
    }
  };

  return (
    <Styled.Header>
      <Styled.AppTitle onClick={() => handleOnClick()}>
        {title()}
      </Styled.AppTitle>
    </Styled.Header>
  );
};

export default Header;

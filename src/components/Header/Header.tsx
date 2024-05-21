import { useLocation } from 'react-router-dom';
import * as Styled from './style';
import MESSAGE from '../../constants/Message';

interface HeaderProps {
  onClick?: () => void;
}

const Header = ({ onClick }: HeaderProps) => {
  const title = () => {
    const location = useLocation();

    switch (location.pathname) {
      case '/':
        return MESSAGE.shop;
      case '/orderConfirmation':
        return MESSAGE.backSpace;
      default:
        return '';
    }
  };

  return (
    <Styled.Header>
      <Styled.AppTitle onClick={() => onClick && onClick()}>
        {title()}
      </Styled.AppTitle>
    </Styled.Header>
  );
};

export default Header;

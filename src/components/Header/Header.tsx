import { useLocation } from 'react-router-dom';
import * as Styled from './style';

interface HeaderProps {
  onClick?: () => void;
}

const Header = ({ onClick }: HeaderProps) => {
  const location = useLocation();

  const getHeaderTitle = (path: any) => {
    if (path === '/') return 'SHOP';
    if (path === '/orderConfirmation') return '⬅';
    return 'none';
  };

  return (
    <Styled.Header>
      <Styled.AppTitle onClick={() => onClick && onClick()}>
        {getHeaderTitle(location.pathname)}
      </Styled.AppTitle>
    </Styled.Header>
  );
};

export default Header;

import { Link } from 'react-router-dom';
import { LOGO } from '../../assets';
import CartButton from './CartButton/CartButton';
import * as Styled from './Header.styled';
import Routes from '../../constants/Routes';

const Header = () => {
  return (
    <Styled.Header>
      <Link to={Routes.PRODUCTS}>
        <Styled.TitleDiv>
          <LOGO />
          <Styled.TitleHeading>SHOP</Styled.TitleHeading>
        </Styled.TitleDiv>
      </Link>

      <Link to={Routes.CART}>
        <CartButton />
      </Link>
    </Styled.Header>
  );
};

export default Header;

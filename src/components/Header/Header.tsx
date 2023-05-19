import { Link } from 'react-router-dom';
import { LOGO } from '../../assets';
import CartButton from './CartButton/CartButton';
import * as Styled from './Header.styled';

const Header = () => {
  return (
    <Styled.Header>
      <Link to="/">
        <Styled.TitleDiv>
          <LOGO />
          <Styled.TitleHeading>SHOP</Styled.TitleHeading>
        </Styled.TitleDiv>
      </Link>

      <Link to="/cart">
        <CartButton />
      </Link>
    </Styled.Header>
  );
};

export default Header;

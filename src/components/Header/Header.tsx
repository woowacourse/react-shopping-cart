import { LOGO } from '../../assets';
import CartButton from './CartButton/CartButton';
import * as Styled from './Header.styled';

const Header = () => {
  return (
    <Styled.Header>
      <Styled.TitleDiv>
        <LOGO />
        <Styled.TitleHeading>SHOP</Styled.TitleHeading>
      </Styled.TitleDiv>

      <CartButton />
    </Styled.Header>
  );
};

export default Header;

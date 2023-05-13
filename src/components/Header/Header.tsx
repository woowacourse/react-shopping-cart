import { LOGO } from '../../assets';

import {
  StyledHeader,
  StyledTitleDiv,
  StyledTitleHeading,
} from './Header.styled';
import CartButton from '../CartButton/CartButton';

const Header = () => {
  return (
    <StyledHeader>
      <StyledTitleDiv>
        <LOGO />
        <StyledTitleHeading>SHOP</StyledTitleHeading>
      </StyledTitleDiv>

      <CartButton />
    </StyledHeader>
  );
};

export default Header;

import { LOGO } from '@assets/index';

import {
  StyledHeader,
  StyledTitleDiv,
  StyledTitleHeading,
} from '@components/Header/Header.styled';
import CartButton from '@components/CartButton/CartButton';

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

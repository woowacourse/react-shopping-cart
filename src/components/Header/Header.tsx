import { LOGO } from '@assets/index';

import { StyledHeader, StyledTitleDiv } from '@components/Header/Header.styled';
import Heading from '@components/commons/Heading/Heading';
import CartButton from '@components/CartButton/CartButton';

const Header = () => {
  return (
    <StyledHeader>
      <StyledTitleDiv>
        <LOGO />
        <Heading text="SHOP" color="white" fontSize="40px" lineHeight="58px" />
      </StyledTitleDiv>
      <CartButton />
    </StyledHeader>
  );
};

export default Header;

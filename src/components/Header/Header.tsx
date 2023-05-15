import { LOGO } from '@assets/index';

import {
  StyledCartFlexBox,
  StyledHeader,
  StyledTitleDiv,
} from '@components/Header/Header.styled';
import Heading from '@components/commons/Heading/Heading';
import Text from '@components/commons/Text/Text';
import CartButton from './CartButton/CartButton';

const Header = () => {
  return (
    <StyledHeader>
      <StyledTitleDiv>
        <LOGO />
        <Heading text="SHOP" color="white" fontSize="40px" lineHeight="58px" />
      </StyledTitleDiv>
      <StyledCartFlexBox>
        <Text text="장바구니" color="white" fontSize="24px" />
        <CartButton />
      </StyledCartFlexBox>
    </StyledHeader>
  );
};

export default Header;

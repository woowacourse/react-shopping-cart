import { Link } from 'react-router-dom';

import { LOGO } from '@assets/index';

import {
  StyledCartFlexBox,
  StyledHeader,
  StyledTitleDiv,
} from '@components/Header/Header.styled';
import * as Text from '@components/commons/Text/Text';
import CartLengthButton from '@components/Header/CartLengthButton/CartLengthButton';

const Header = () => {
  return (
    <StyledHeader>
      <Link to="/">
        <StyledTitleDiv>
          <LOGO />
          <Text.Title color="white">SHOP</Text.Title>
        </StyledTitleDiv>
      </Link>
      <Link to="/cart">
        <StyledCartFlexBox>
          <Text.Paragraph color="white">장바구니</Text.Paragraph>
          <CartLengthButton />
        </StyledCartFlexBox>
      </Link>
    </StyledHeader>
  );
};

export default Header;

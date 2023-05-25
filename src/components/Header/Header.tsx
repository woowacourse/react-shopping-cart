import { Link } from 'react-router-dom';

import { LOGO } from '@assets/index';

import {
  StyledCartFlexBox,
  StyledHeader,
  StyledTitleDiv,
} from '@components/Header/Header.styled';
import * as Text from '@components/commons/Text/Text';
import CartLengthBox from '@components/Header/CartLengthBox/CartLengthBox';

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
          <CartLengthBox />
        </StyledCartFlexBox>
      </Link>
    </StyledHeader>
  );
};

export default Header;

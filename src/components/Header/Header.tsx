import { Link } from 'react-router-dom';

import { LOGO } from '@assets/index';

import {
  StyledCartFlexBox,
  StyledHeader,
  StyledTitleDiv,
} from '@components/Header/Header.styled';
import * as Text from '@components/commons/Text/Text';
import CartButton from '@components/Header/CartButton/CartButton';

const Header = () => {
  return (
    <StyledHeader>
      <Link to="/" reloadDocument={true}>
        <StyledTitleDiv>
          <LOGO />
          <Text.Title color="white">SHOP</Text.Title>
        </StyledTitleDiv>
      </Link>
      <StyledCartFlexBox>
        <Text.Paragraph color="white">장바구니</Text.Paragraph>
        <CartButton />
      </StyledCartFlexBox>
    </StyledHeader>
  );
};

export default Header;

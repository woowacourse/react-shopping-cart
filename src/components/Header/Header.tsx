import { LOGO } from '@assets/index';

import {
  StyledCartFlexBox,
  StyledHeader,
  StyledTitleDiv,
} from '@components/Header/Header.styled';
import Heading from '@components/commons/Heading/Heading';
import Text from '@components/commons/Text/Text';
import CartButton from './CartButton/CartButton';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <StyledHeader>
      <Link to="/" reloadDocument={true}>
        <StyledTitleDiv>
          <LOGO />
          <Heading
            text="SHOP"
            color="white"
            fontSize="40px"
            lineHeight="58px"
          />
        </StyledTitleDiv>
      </Link>
      <StyledCartFlexBox>
        <Text text="장바구니" color="white" fontSize="24px" />
        <CartButton />
      </StyledCartFlexBox>
    </StyledHeader>
  );
};

export default Header;

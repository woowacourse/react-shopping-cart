import { LOGO } from '../../assets';
import { useRecoilValue } from 'recoil';

import { cartLengthSelector } from '../../recoil/myCartState';
import * as Styled from './Header.styled';

const Header = () => {
  const cartLength = useRecoilValue(cartLengthSelector);

  return (
    <Styled.Header>
      <Styled.TitleDiv>
        <LOGO />
        <Styled.TitleHeading>SHOP</Styled.TitleHeading>
      </Styled.TitleDiv>

      <Styled.CartButton>
        <p>장바구니</p>
        <Styled.CartLengthDiv>{cartLength}</Styled.CartLengthDiv>
      </Styled.CartButton>
    </Styled.Header>
  );
};

export default Header;

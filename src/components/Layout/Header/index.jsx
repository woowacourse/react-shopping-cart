import { 아이콘_코드 } from 'constants/';
import * as CommonStyled from 'components/@common/CommonStyle/styles';
import * as Styled from './styles';

const Header = () => (
  <Styled.Container>
    <CommonStyled.FlexWrapper>
      <Styled.LeftMenuButton>전체 카테고리</Styled.LeftMenuButton>
    </CommonStyled.FlexWrapper>

    <Styled.Logo />

    <Styled.RightMenu>
      <Styled.RightMenuButton icon={아이콘_코드.CART}>장바구니</Styled.RightMenuButton>
      <Styled.RightMenuButton icon={아이콘_코드.USER}>주문 목록</Styled.RightMenuButton>
    </Styled.RightMenu>
  </Styled.Container>
);

export default Header;

import * as Styled from './Header.styles';
import shoppingCartSVG from '../../assets/svgs/shopping-cart.svg';

const Header = () => {
  return (
    <Styled.Header>
      <Styled.HeaderTitle>
        <Styled.Logo src={shoppingCartSVG} />
        WOOWA SHOP
      </Styled.HeaderTitle>
      <div>
        <Styled.LinkButton>장바구니</Styled.LinkButton>
        <Styled.LinkButton>주문목록</Styled.LinkButton>
      </div>
    </Styled.Header>
  );
};

export default Header;

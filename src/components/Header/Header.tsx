import * as Styled from './Header.styles';
import shoppingCartSVG from '../../assets/svgs/shopping-cart.svg';
import { useHistory } from 'react-router';
import { PATH } from '../../constants';

export interface Props {
  styles?: React.CSSProperties;
}

const Header = ({ styles }: Props) => {
  const history = useHistory();

  const onHeaderTitleClick = () => {
    history.push(PATH.ROOT);
  };

  const onCartLinkButtonClick = () => {
    history.push(PATH.CART);
  };

  const onOrderListLinkButtonClick = () => {
    history.push(PATH.ORDER_LIST);
  };

  return (
    <Styled.Header styles={styles}>
      <Styled.HeaderTitle onClick={onHeaderTitleClick}>
        <Styled.Logo src={shoppingCartSVG} />
        WOOWA SHOP
      </Styled.HeaderTitle>
      <div>
        <Styled.LinkButton onClick={onCartLinkButtonClick}>장바구니</Styled.LinkButton>
        <Styled.LinkButton onClick={onOrderListLinkButtonClick}>주문목록</Styled.LinkButton>
      </div>
    </Styled.Header>
  );
};

export default Header;

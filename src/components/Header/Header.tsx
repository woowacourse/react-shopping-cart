import * as Styled from './Header.styles';
import shoppingCartSVG from '../../assets/svgs/shopping-cart.svg';
import { useHistory } from 'react-router';
import { PATH } from '../../constants';

export interface Props {
  styles?: React.CSSProperties;
}

const Header = ({ styles }: Props) => {
  const history = useHistory();

  const moveToPath = (path: string) => {
    history.push(path);
  };

  return (
    <Styled.Header styles={styles}>
      <Styled.HeaderTitle onClick={() => moveToPath(PATH.ROOT)}>
        <Styled.Logo src={shoppingCartSVG} />
        WOOWA SHOP
      </Styled.HeaderTitle>
      <div>
        <Styled.LinkButton onClick={() => moveToPath(PATH.CART)}>장바구니</Styled.LinkButton>
        <Styled.LinkButton onClick={() => moveToPath(PATH.ORDER_LIST)}>주문목록</Styled.LinkButton>
      </div>
    </Styled.Header>
  );
};

export default Header;

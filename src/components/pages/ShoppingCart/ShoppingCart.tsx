import * as Styled from './style';

import Header from '../../Header/Header';
import ItemList from '../../ItemList/ItemList';
import OrderButton from '../../OrderButton/OrderButton';
import Title from '../../Title/Title';
import TotalPaymentInfo from '../../TotalPaymentInfo/TotalPaymentInfo';

import { useRecoilValue } from 'recoil';
import { CartItemsSelector } from '../../../recoil/cartItems';
import { SelectedSomeCardItemsSelector } from '../../../recoil/selectedAllCardItems';

const ShoppingCart = () => {
  const cartItems = useRecoilValue(CartItemsSelector);

  const hasSomeCartItem = !!cartItems.length;
  const isSomeCartItemSelected = useRecoilValue(SelectedSomeCardItemsSelector);

  const isOrderable = hasSomeCartItem && isSomeCartItemSelected;

  return (
    <Styled.ShoppingCart>
      <Header title="SHOP" />

      {hasSomeCartItem && (
        <Styled.Container>
          <Title
            title="장바구니"
            caption={`현재 ${cartItems.length}종류의 상품이 담겨있습니다.`}
          />
          <ItemList />
          <TotalPaymentInfo />
        </Styled.Container>
      )}

      {!hasSomeCartItem && <Title title="장바구니" />}

      <OrderButton
        onClick={() => console.log('s')}
        label="주문 확인"
        isOrderable={isOrderable}
      />
    </Styled.ShoppingCart>
  );
};

export default ShoppingCart;

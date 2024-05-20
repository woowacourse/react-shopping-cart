import * as Styled from './style';

import Header from '../../Header/Header';
import CartItems from '../../CartItems/CartItems';
import OrderButton from '../../OrderButton/OrderButton';
import Title from '../../Title/Title';
import TotalPaymentInfo from '../../TotalPaymentInfo/TotalPaymentInfo';

import { useRecoilValue } from 'recoil';
import { cartItemsState } from '../../../recoil/cartItems';
import { selectedSomeCartItemState } from '../../../recoil/selectedCardItems';
import { useNavigate } from 'react-router-dom';

import MESSAGE from '../../../constants/Message';

const ShoppingCart = () => {
  const navigator = useNavigate();

  const cartItems = useRecoilValue(cartItemsState);

  const cartItemCount = cartItems.length;
  const hasSomeCartItem = !!cartItemCount;
  const isSomeCartItemSelected = useRecoilValue(selectedSomeCartItemState);

  const isOrderable = hasSomeCartItem && isSomeCartItemSelected;

  return (
    <Styled.ShoppingCart>
      <Header children={MESSAGE.shop} />

      <Styled.Container>
        {hasSomeCartItem && (
          <>
            <Title
              title={MESSAGE.shoppingCart}
              caption={MESSAGE.titleCaption(cartItemCount)}
            />
            <CartItems />
            <TotalPaymentInfo />
          </>
        )}

        {!hasSomeCartItem && (
          <>
            <Title title={MESSAGE.shoppingCart} />
            <Styled.Content>
              <Styled.EmptyCartMessage>
                {MESSAGE.emptyCart}
              </Styled.EmptyCartMessage>
            </Styled.Content>
          </>
        )}
      </Styled.Container>

      <OrderButton
        onClick={() => navigator('/orderConfirmation')}
        children={MESSAGE.orderConfirmation}
        isOrderable={isOrderable}
      />
    </Styled.ShoppingCart>
  );
};

export default ShoppingCart;

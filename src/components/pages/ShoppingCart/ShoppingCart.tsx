import * as Styled from './style';

import Header from '../../Header/Header';
import CartItems from '../../CartItems/CartItems';
import OrderButton from '../../OrderButton/OrderButton';
import Title from '../../Title/Title';
import TotalPaymentInfo from '../../TotalPaymentInfo/TotalPaymentInfo';

import { useRecoilValue } from 'recoil';
import { cartItemsCountState } from '../../../recoil/cartItems';
import { isSomeCartItemSelectedState } from '../../../recoil/selectedCardItems';
import { useNavigate } from 'react-router-dom';

import MESSAGE from '../../../constants/Message';

const ShoppingCart = () => {
  const navigator = useNavigate();

  const cartItemsCount = useRecoilValue(cartItemsCountState);

  const hasSomeCartItem = !!cartItemsCount;
  const isSomeCartItemSelected = useRecoilValue(isSomeCartItemSelectedState);

  const isOrderable = hasSomeCartItem && isSomeCartItemSelected;

  return (
    <Styled.ShoppingCart>
      <Header />

      <Styled.Container>
        {hasSomeCartItem && (
          <>
            <Title
              title={MESSAGE.shoppingCart}
              caption={MESSAGE.titleCaption(cartItemsCount)}
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

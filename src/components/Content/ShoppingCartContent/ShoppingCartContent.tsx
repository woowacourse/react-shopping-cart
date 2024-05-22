import * as Styled from './style';
import { Content } from '../style';

import CartItems from '../../CartItems/CartItems';
import Title from '../../Title/Title';
import TotalPaymentInfo from '../../TotalPaymentInfo/TotalPaymentInfo';

import { useRecoilValue } from 'recoil';

import { cartItemsCountSelector } from '../../../recoil/selectors';

import MESSAGE from '../../../constants/Message';

const ShoppingCartContent = () => {
  const cartItemsCount = useRecoilValue(cartItemsCountSelector);

  const hasSomeCartItem = !!cartItemsCount;

  return (
    <Content>
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
          <Styled.EmptyCartMessage>{MESSAGE.emptyCart}</Styled.EmptyCartMessage>
        </>
      )}
    </Content>
  );
};

export default ShoppingCartContent;

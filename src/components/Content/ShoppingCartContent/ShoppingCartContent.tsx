import * as Styled from './style';
import { Content as StyledContent } from '../style';

import { useRecoilValue } from 'recoil';

import { cartItemsCountSelector } from '../../../recoil/selectors';

import ShoppingCartItems from '../../CartItems/ShoppingCartItems/ShoppingCartItems';
import ShoppingCartTotalPaymentInfo from '../../TotalPaymentInfo/ShoppingCartTotalPaymentInfo';
import ShoppingCartTitleContainer from '../../TitleContainer/ShoppingCartTitleContainer';

import MESSAGE from '../../../constants/Message';

const ShoppingCartContent = () => {
  const cartItemsCount = useRecoilValue(cartItemsCountSelector);

  const hasSomeCartItem = !!cartItemsCount;

  return (
    <StyledContent>
      {hasSomeCartItem && (
        <>
          <ShoppingCartTitleContainer />
          <ShoppingCartItems />
          <ShoppingCartTotalPaymentInfo />
        </>
      )}

      {!hasSomeCartItem && (
        <>
          <ShoppingCartTitleContainer />
          <Styled.EmptyCartMessage>{MESSAGE.emptyCart}</Styled.EmptyCartMessage>
        </>
      )}
    </StyledContent>
  );
};

export default ShoppingCartContent;

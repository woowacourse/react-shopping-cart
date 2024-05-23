import * as Styled from './style';
import { Content as StyledContent } from '../style';

import { useRecoilValue } from 'recoil';

import { cartItemsCountSelector } from '../../../recoil/selectors';

import ShoppingCartItems from '../../CartItems/ShoppingCartItems/ShoppingCartItems';
import Title from '../../Title/Title';
import ShoppingCartTotalPaymentInfo from '../../TotalPaymentInfo/ShoppingCartTotalPaymentInfo';
import Caption from '../../Caption/Caption';
import TitleContainer from '../../TitleContainer/TitleContainer';

import MESSAGE from '../../../constants/Message';

const ShoppingCartContent = () => {
  const cartItemsCount = useRecoilValue(cartItemsCountSelector);

  const hasSomeCartItem = !!cartItemsCount;

  return (
    <StyledContent>
      {hasSomeCartItem && (
        <>
          <TitleContainer>
            <Title>{MESSAGE.shoppingCart}</Title>
            <Caption>{MESSAGE.titleCaption(cartItemsCount)}</Caption>
          </TitleContainer>
          <ShoppingCartItems />
          <ShoppingCartTotalPaymentInfo />
        </>
      )}

      {!hasSomeCartItem && (
        <>
          <TitleContainer>
            <Title>{MESSAGE.shoppingCart}</Title>
          </TitleContainer>
          <Styled.EmptyCartMessage>{MESSAGE.emptyCart}</Styled.EmptyCartMessage>
        </>
      )}
    </StyledContent>
  );
};

export default ShoppingCartContent;

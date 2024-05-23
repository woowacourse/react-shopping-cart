import * as Styled from './style';
import { Content } from '../style';

import ShoppingCartItems from '../../CartItems/ShoppingCartItems/ShoppingCartItems';
import Title from '../../Title/Title';
import TotalPaymentInfo from '../../TotalPaymentInfo/TotalPaymentInfo';

import { useRecoilValue } from 'recoil';

import { cartItemsCountSelector } from '../../../recoil/selectors';

import MESSAGE from '../../../constants/Message';

import Caption from '../../Caption/Caption';
import TitleContainer from '../../TitleContainer/TitleContainer';

const ShoppingCartContent = () => {
  const cartItemsCount = useRecoilValue(cartItemsCountSelector);

  const hasSomeCartItem = !!cartItemsCount;

  return (
    <Content>
      {hasSomeCartItem && (
        <>
          <TitleContainer>
            <Title>{MESSAGE.shoppingCart}</Title>
            <Caption>{MESSAGE.titleCaption(cartItemsCount)}</Caption>
          </TitleContainer>
          <ShoppingCartItems />
          <TotalPaymentInfo />
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
    </Content>
  );
};

export default ShoppingCartContent;

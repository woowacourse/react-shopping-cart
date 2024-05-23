import { useRecoilValue } from 'recoil';
import { cartItemsCountSelector } from '../../recoil/selectors';

import Caption from '../Caption/Caption';
import Title from '../Title/Title';
import TitleContainer from './TitleContainer';

import MESSAGE from '../../constants/Message';

const ShoppingCartTitleContainer = () => {
  const cartItemsCount = useRecoilValue(cartItemsCountSelector);

  const hasSomeCartItem = !!cartItemsCount;

  return (
    <TitleContainer>
      <>
        {hasSomeCartItem && (
          <>
            <Title>{MESSAGE.shoppingCart}</Title>
            <Caption>{MESSAGE.titleCaption(cartItemsCount)}</Caption>
          </>
        )}
        {!hasSomeCartItem && <Title>{MESSAGE.shoppingCart}</Title>}
      </>
    </TitleContainer>
  );
};

export default ShoppingCartTitleContainer;

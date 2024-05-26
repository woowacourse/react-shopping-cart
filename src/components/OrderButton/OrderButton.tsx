import * as Styled from './style';

import { useLocation, useNavigate } from 'react-router-dom';

import { useRecoilValue, useSetRecoilState } from 'recoil';
import {
  cartItemIdsSelector,
  cartItemsCountSelector,
  isAllCartItemSelectedSelectorFamily,
  isSomeCartItemSelectedSelector,
  selectedCartItemIdsSelector,
} from '../../recoil/selectors';
import { cartItemsState } from '../../recoil/atoms';

import { fetchPostingOrders } from '../../api/orders';
import { fetchGettingCartItems } from '../../api/shoppingCart';
import {
  generateButtonLabel,
  generateNextPageNavigatorPath,
} from '../../utils/utils';

import CONDITION from '../../constants/Condition';

const OrderButton = () => {
  const setCartItems = useSetRecoilState(cartItemsState);
  const cartItemIds = useRecoilValue(cartItemIdsSelector);
  const cartItemsCount = useRecoilValue(cartItemsCountSelector);
  const isSomeCartItemSelected = useRecoilValue(isSomeCartItemSelectedSelector);
  const selectedCartItemIds = useRecoilValue(selectedCartItemIdsSelector);
  const setIsAllCatItemsSelected = useSetRecoilState(
    isAllCartItemSelectedSelectorFamily(cartItemIds),
  );

  const hasSomeCartItem = !!cartItemsCount;
  const isOrderable = hasSomeCartItem && isSomeCartItemSelected;

  const page = useLocation().pathname;
  const navigator = useNavigate();

  const resetShoppingCartPage = async () => {
    setCartItems(await fetchGettingCartItems());
    setIsAllCatItemsSelected(true);
  };

  const handleOnClick = () => {
    if (page === CONDITION.orderConfirmationPage) {
      fetchPostingOrders(selectedCartItemIds);
    }

    if (page === CONDITION.paymentConfirmationPage) {
      resetShoppingCartPage();
    }

    navigator(generateNextPageNavigatorPath(page));
  };

  return (
    <Styled.OrderButton
      onClick={handleOnClick}
      $isOrderable={isOrderable}
      disabled={!isOrderable}
    >
      {generateButtonLabel(page)}
    </Styled.OrderButton>
  );
};

export default OrderButton;

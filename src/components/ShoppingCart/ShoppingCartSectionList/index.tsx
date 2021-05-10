import { useAppSelector } from '../../../states/store';
import { ItemInCart } from '../../../types';
import Checkbox from '../../shared/Checkbox';
import ShoppingCartSection from './ShoppingCartSection';
import {
  ShoppingCartItemListContainer,
  SelectedItemDeleteButton,
  CartSelectContainer,
} from './style';

const ShoppingCartSectionList = () => {
  const items = useAppSelector((state) => state.cart.items);

  return (
    <ShoppingCartItemListContainer>
      <CartSelectContainer>
        <Checkbox description="선택해제" />
        <SelectedItemDeleteButton>상품삭제</SelectedItemDeleteButton>
      </CartSelectContainer>
      <ShoppingCartSection title="든든배송" items={items} />
    </ShoppingCartItemListContainer>
  );
};

export default ShoppingCartSectionList;

// https://redux.js.org/recipes/usage-with-typescript#define-root-state-and-dispatch-types

import { PRODUCT_LIST_MOCK } from '../../../mocks/mockData';
import Checkbox from '../../shared/Checkbox';
import ShoppingCartSection from './ShoppingCartSection';
import {
  ShoppingCartItemListContainer,
  SelectedItemDeleteButton,
  CartSelectContainer,
} from './style';

const ShoppingCartSectionList = () => {
  const items = PRODUCT_LIST_MOCK;

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

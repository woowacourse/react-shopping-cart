import { useState, FC } from 'react';
import { CONFIRM } from '../../../constants/message';
import useFetchCartRedux from '../../../hooks/useFetchCartRedux';
import Checkbox from '../../shared/Checkbox';
import ShoppingCartSection from './ShoppingCartSection';
import {
  ShoppingCartItemListContainer,
  SelectedItemDeleteButton,
  CartSelectContainer,
} from './style';

const ShoppingCartSectionList: FC = () => {
  const [checked, setChecked] = useState(false);
  const { changeAllChecked, deleteCheckedItems, itemsInCart: items } = useFetchCartRedux();

  const onChangeCheckAll = () => {
    const negatedChecked = !checked;

    changeAllChecked(negatedChecked);
    setChecked(negatedChecked);
  };

  const onCheckedItemsDelete = () => {
    if (!window.confirm(CONFIRM.DELETE_ALL_CART_ITEMS)) return;

    deleteCheckedItems(items);
  };

  return (
    <ShoppingCartItemListContainer>
      <CartSelectContainer>
        <Checkbox description="선택해제" checked={checked} onChange={onChangeCheckAll} />
        <SelectedItemDeleteButton type="button" onClick={onCheckedItemsDelete}>
          상품삭제
        </SelectedItemDeleteButton>
      </CartSelectContainer>
      <ShoppingCartSection title="든든배송" items={items} />
    </ShoppingCartItemListContainer>
  );
};

export default ShoppingCartSectionList;

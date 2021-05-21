import { useState, FC } from 'react';
import { CONFIRM } from '../../../constants/message';
import useCartItems from '../../../hooks/useCartItems';
import useCartChangeCheckState from '../../../hooks/useCartItems/useCartChangeCheckState';
import useCartDeleteItem from '../../../hooks/useCartItems/useCartDeleteItem';
import Checkbox from '../../shared/Checkbox';
import ShoppingCartSection from './ShoppingCartSection';
import {
  ShoppingCartItemListContainer,
  SelectedItemDeleteButton,
  CartSelectContainer,
} from './style';

const ShoppingCartSectionList: FC = () => {
  const [checked, setChecked] = useState(false);
  const { itemsInCart: items } = useCartItems();
  const { changeAllChecked } = useCartChangeCheckState();
  const { deleteItems } = useCartDeleteItem();

  const onChangeCheckAll = () => {
    const negatedChecked = !checked;

    changeAllChecked(negatedChecked);
    setChecked(negatedChecked);
  };

  const onCheckedItemsDelete = () => {
    if (!window.confirm(CONFIRM.DELETE_ALL_CART_ITEMS)) return;

    deleteItems(items.filter((item) => item.checked));
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

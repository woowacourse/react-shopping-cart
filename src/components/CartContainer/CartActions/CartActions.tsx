import { ChangeEvent } from 'react';
import * as styled from './CartActions.styled';

import { Checkbox } from '../../styled/Checkbox';

import {
  useCartItems,
  useCartRepository,
  useCheckedCartItems,
  useIsAllCartChecked,
} from '../../../recoils/recoilCart';

export const CartActions = () => {
  const cartItems = useCartItems();
  const isAllCartChecked = useIsAllCartChecked();
  const checkedCartItems = useCheckedCartItems();
  const { deleteCartItem, toggleAllCheckboxBy } = useCartRepository();

  const onChangeAllCheckbox = ({ target: { checked } }: ChangeEvent<HTMLInputElement>) => {
    toggleAllCheckboxBy(checked);
  };

  const onClickDeleteSelectedItemButton = () => {
    checkedCartItems.forEach((item) => {
      deleteCartItem(item.id);
    });
  };

  return (
    <styled.SelectionActions>
      <styled.ToggleAllCheckBox>
        <Checkbox type="checkbox" checked={isAllCartChecked} onChange={onChangeAllCheckbox} />
        <span>
          전체선택 ({cartItems.length}/{checkedCartItems.length})
        </span>
      </styled.ToggleAllCheckBox>
      <styled.DeleteSelectedItemButton onClick={onClickDeleteSelectedItemButton}>
        선택삭제
      </styled.DeleteSelectedItemButton>
    </styled.SelectionActions>
  );
};

import { CartItem } from '@appTypes/shoppingCart';
import { Checkbox } from '@components/common';
import { CartListItem } from '@components/shoppingCart';
import { STORAGE_KEY } from '@constants/storage';
import { cartItemsSelector } from '@recoil/shoppingCart';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';

import * as Styled from './CartList.styled';

interface CartListProps {
  cartItems: CartItem[];
}

const CartList: React.FC<CartListProps> = () => {
  // TODO : 커스텀 훅
  const cartItems = useRecoilValue(cartItemsSelector);

  const [selectedCartItemIds, setSelectedCartItemIds] = useState<number[]>(
    () => JSON.parse(localStorage.getItem(STORAGE_KEY.selectedItems) ?? '[]') ?? [],
  );

  const handleChangeTotalCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newCheckState = event.target.checked ? cartItems.map((cartItem) => cartItem.id) : [];

    setSelectedCartItemIds(newCheckState);

    localStorage.setItem(STORAGE_KEY.selectedItems, JSON.stringify(newCheckState));
  };

  const handleChangeCheck = (event: React.ChangeEvent<HTMLInputElement>, id: number) => {
    const newSelectedCartItemIds = event.target.checked
      ? [...selectedCartItemIds, id]
      : selectedCartItemIds.filter((selectedId) => selectedId !== id);

    setSelectedCartItemIds(newSelectedCartItemIds);

    localStorage.setItem(STORAGE_KEY.selectedItems, JSON.stringify(newSelectedCartItemIds));
  };

  return (
    <div>
      <Styled.CartListButtonGroup>
        <Checkbox checked={selectedCartItemIds.length === cartItems.length} onChange={handleChangeTotalCheck} />
        <span className="label">전체 선택</span>
      </Styled.CartListButtonGroup>
      <Styled.CartItemContainer>
        {cartItems.map((cartItem) => (
          <CartListItem
            key={cartItem.id}
            isChecked={selectedCartItemIds.some((selectedId) => selectedId === cartItem.id)}
            onChangeCheck={handleChangeCheck}
            cartItem={cartItem}
          />
        ))}
      </Styled.CartItemContainer>
    </div>
  );
};

export default CartList;

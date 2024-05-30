import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilCallback, useRecoilValue } from 'recoil';

import { checkedCartItemIdsState } from '@/e_entities/cart/model/recoil';
import { fetchCartItems, urls } from '@/f_shared';

export const useOrderCartItem = () => {
  const checkedCartItemIds = useRecoilValue(checkedCartItemIdsState);
  const [disabled, setDisabled] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setDisabled(checkedCartItemIds.length === 0);
  }, [checkedCartItemIds]);

  const handleOrder = useRecoilCallback(() => async () => {
    const cartItems = await fetchCartItems();
    const cartItemIds = cartItems.map((item) => item.id);

    const invalidCheckedIds = checkedCartItemIds.filter((id: CartItemId) => !cartItemIds.includes(id));
    if (invalidCheckedIds.length > 0) {
      alert('잘못된 요청입니다');
      window.location.reload();
      return;
    }

    navigate(urls.order);
  });

  return { disabled, handleOrder };
};

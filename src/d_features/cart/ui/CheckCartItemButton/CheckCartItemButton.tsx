import { useRecoilValue } from 'recoil';

import { checkedCartItemIdsState } from '@/e_entities/cart';
import { Checkbox } from '@/f_shared/ui/Checkbox/Checkbox';

import { useToggleChecked } from '../../model/check';

interface CheckCartItemProps {
  cartItemId: CartItemId;
}

export const CheckCartItemButton = ({ cartItemId }: CheckCartItemProps) => {
  const checkedCartItemIds = useRecoilValue(checkedCartItemIdsState);
  const checked = checkedCartItemIds.includes(cartItemId);
  const toggleChecked = useToggleChecked(cartItemId);

  return <Checkbox checked={checked} onChange={toggleChecked} />;
};

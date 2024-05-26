import { ItemDetailsStateType } from '../types/Item';
import { mockOrderItems } from './orderItems';

interface mockItemDetailsType extends ItemDetailsStateType {
  id: number;
}

export const mockItemDetails: mockItemDetailsType[] = mockOrderItems.map(
  (item) => ({
    id: item.id,
    quantity: item.quantity,
    price: item.product.price,
    isChecked: true,
  }),
);

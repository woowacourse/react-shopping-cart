import { ItemDetailsStateType } from '../types/Item';
import {
  mockOrderItemsWithDeliveryFee,
  mockOrderItemsWithOutDeliveryFee,
} from './orderItems';

interface mockItemDetailsType extends ItemDetailsStateType {
  id: number;
}

export const mockItemDetailsWithDeliveryFee: mockItemDetailsType[] =
  mockOrderItemsWithDeliveryFee.map((item) => ({
    id: item.id,
    quantity: item.quantity,
    price: item.product.price,
    isChecked: true,
  }));

export const mockItemDetailsWithOutDeliveryFee: mockItemDetailsType[] =
  mockOrderItemsWithOutDeliveryFee.map((item) => ({
    id: item.id,
    quantity: item.quantity,
    price: item.product.price,
    isChecked: true,
  }));

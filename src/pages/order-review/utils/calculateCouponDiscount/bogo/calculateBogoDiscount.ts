import { Cart } from '@/api/cart';
import { getMostExpensiveItem } from './getMostExpensiveItem';
import { getBogoEligibleItems } from './getBogoEligibleItems';

export const calculateBogoDiscount = (selectedItems: Cart[]) => {
  if (selectedItems.length === 0) return 0;
  const bogoEligibleItems = getBogoEligibleItems(selectedItems);
  const targetItem = getMostExpensiveItem(bogoEligibleItems);
  return targetItem.product.price; // 가장 비싼 아이템의 가격(무료로 지급)
};

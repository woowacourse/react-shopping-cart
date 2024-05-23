import * as CartManager from '../cartStates';
import { useManager } from './useManager';

const selectors = {
  allCartItemStates: CartManager.allCartItemStates,
  totalCartItems: CartManager.totalCartItemsSelector,
  isAllCheckedCartItems: CartManager.isAllCheckedCartItemsSelector,
  orderAmount: CartManager.orderAmountSelector,
  totalOrderAmount: CartManager.totalOrderAmountSelector,
  totalCategoryCount: CartManager.totalCategoryCountSelector,
  totalOrderQuantity: CartManager.totalOrderQuantitySelector,
};

const actions = {
  toggleAllCheckedItems: CartManager.isAllCheckedCartItemsSelector,
};

const states = {
  isAllCheckedCartItems: CartManager.isAllCheckedCartItemsSelector,
  isCheckedIndividualCartItem: (id: number) => CartManager.isCheckedIndividualCartItemSelector(id),
  individualCartItemQuantity: (id: number) => CartManager.individualCartItemQuantitySelector(id),
};

export const useCartManager = () => useManager(selectors, actions, states);

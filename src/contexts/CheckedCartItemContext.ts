// CheckedCartItemsContext.ts
import { createContext, useContext } from 'react';
import { CartItem } from '../types';

interface CheckedCartItemsContextType {
  checkedCartIds: number[];
  isAllChecked: boolean;
  init: (cartItems: CartItem[]) => void;
  addCheckedCartItem: (id: number) => void;
  removeCheckedCartItem: (id: number) => void;
  toggleAllChecked: () => void;
  handleClickDelete: (id: number) => void;
}

export const CheckedCartItemsContext =
  createContext<CheckedCartItemsContextType | null>(null);

export const useCheckedCartItemsContext = () => {
  const context = useContext(CheckedCartItemsContext);
  if (!context) {
    throw new Error(
      'useCheckedCartItemsContext는 CheckedCartItemsProvider로 감싸져야 합니다.'
    );
  }
  return context;
};

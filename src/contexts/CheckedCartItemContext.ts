// CheckedCartItemsContext.ts
import React, { createContext, useContext } from 'react';

interface CheckedCartItemsContextType {
  checkedCartIds: number[];
  isAllChecked: boolean;
  setCheckedCartIds: React.Dispatch<React.SetStateAction<number[]>>;
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

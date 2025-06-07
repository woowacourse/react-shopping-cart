// CheckCartIdsContext.ts
import React, { createContext, useContext } from 'react';

interface CheckCartIdsContextType {
  checkedCartIds: number[];
  isAllChecked: boolean;
  setCheckedCartIds: React.Dispatch<React.SetStateAction<number[]>>;
}

export const CheckCartIdsContext =
  createContext<CheckCartIdsContextType | null>(null);

export const useCheckCartIdsContext = () => {
  const context = useContext(CheckCartIdsContext);
  if (!context) {
    throw new Error(
      'useCheckCartIdsContext는 CheckCartIdsProvider로 감싸져야 합니다.'
    );
  }
  return context;
};

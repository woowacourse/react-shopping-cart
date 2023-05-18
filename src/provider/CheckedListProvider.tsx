import { createContext, useContext } from 'react';
import useCheckedCartList from '../hooks/useCheckedCartList';

interface CheckedCartListValue {
  checkedCartList: string[];
  addCheckedItem: (id: string) => void;
  deleteCheckedItem: (targetId: string) => void;
  isChecked: (id: string) => boolean;
  addAllCheckedItem: () => void;
  deleteAllCheckedItem: () => void;
  isAllChecked: () => boolean;
}

const CheckedCartListContext = createContext<CheckedCartListValue | null>(null);

const CheckedCartListProvider = ({ children }: React.PropsWithChildren) => {
  const value = useCheckedCartList();

  return (
    <CheckedCartListContext.Provider value={value}>
      {children}
    </CheckedCartListContext.Provider>
  );
};

export const useCheckedCartListValue = () => {
  const value = useContext(CheckedCartListContext);

  if (value === null) {
    throw new Error('CheckedCartListContext 에러');
  }

  return value;
};

export default CheckedCartListProvider;

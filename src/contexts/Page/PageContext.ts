import { createContext, useContext } from 'react';

interface PageContextType {
  page: 'cart' | 'orderConfirm';
  setPage: React.Dispatch<React.SetStateAction<'cart' | 'orderConfirm'>>;
}

export const PageContext = createContext<PageContextType | null>(null);

export const usePageContext = () => {
  const context = useContext(PageContext);
  if (!context) {
    throw new Error('usePageContext는 PageProvider로 감싸져야 합니다.');
  }
  return context;
};

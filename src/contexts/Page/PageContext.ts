import { createContext, useContext } from 'react';

export type Page = 'cart' | 'orderConfirm' | 'orderPriceConfirm';
type PageContextType = {
  page: Page;
  setPage: React.Dispatch<React.SetStateAction<Page>>;
};

export const PageContext = createContext<PageContextType | null>(null);

export const usePageContext = () => {
  const context = useContext(PageContext);
  if (!context) {
    throw new Error('usePageContext는 PageProvider로 감싸져야 합니다.');
  }
  return context;
};

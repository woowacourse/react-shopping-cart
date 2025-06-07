import { ReactNode, useState } from 'react';
import { PageContext } from './PageContext';

const PageProvider = ({ children }: { children: ReactNode }) => {
  const [page, setPage] = useState<'cart' | 'orderConfirm'>('cart');
  return (
    <PageContext.Provider
      value={{
        page,
        setPage,
      }}
    >
      {children}
    </PageContext.Provider>
  );
};

export default PageProvider;

import { ReactNode, useState } from 'react';
import { Page, PageContext } from './PageContext';

const PageProvider = ({ children }: { children: ReactNode }) => {
  const [page, setPage] = useState<Page>('cart');
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

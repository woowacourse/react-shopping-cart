import { ProductListPage } from './pages';
import { Page, NavBar } from './commons';

export const App = () => {
  return (
    <>
      <NavBar />
      <Page>
        <ProductListPage />
      </Page>
    </>
  );
};

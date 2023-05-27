import { Suspense } from 'react';
import PageTemplate from '../templates/PageTemplate';
import ProductList from '../list/ProductList/ProductList';
import { Text } from '../common/Text/Text';

const ShoppingPage = () => {
  return (
    <PageTemplate>
      <Suspense fallback={<Text>로딩 중...</Text>}>
        <ProductList />
      </Suspense>
    </PageTemplate>
  );
};

export default ShoppingPage;

import ContentLayout from 'components/@common/ContentLayout';
import Header from 'components/Header';
import ProductItemList from 'components/ProductItemList';
import { useToast } from 'components/@common/Toast/hooks/useToast';

const ProductList = () => {
  const { renderToast } = useToast();

  return (
    <>
      <Header />
      <ContentLayout>
        <ProductItemList />
      </ContentLayout>
      {renderToast}
    </>
  );
};

export default ProductList;

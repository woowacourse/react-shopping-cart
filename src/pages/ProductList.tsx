import ContentLayout from 'components/@common/ContentLayout';
import Header from 'components/@common/Header';
import ProductItemList from 'components/Product/ProductItemList';
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

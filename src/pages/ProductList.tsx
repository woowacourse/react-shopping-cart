import ContentLayout from 'components/@common/ContentLayout';
import ProductItemList from 'components/Product/ProductItemList';
import { useToast } from 'components/@common/Toast/hooks/useToast';

const ProductList = () => {
  const { renderToast } = useToast();

  return (
    <ContentLayout>
      <ProductItemList />
      {renderToast}
    </ContentLayout>
  );
};

export default ProductList;

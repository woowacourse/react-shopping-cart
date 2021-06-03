import { useEffect } from 'react';
import { addItemToCart } from '../../../service/products';
import useProducts from '../../../hooks/useProducts';
import PageWrapper from '../../@common/PageWrapper';
import ProductDetail from '../../ProductDetail';

const Details = ({ onImageError, match }) => {
  const {
    product,
    updateProductDetailURL,
    updateProductDetail,
    resetProductDetail,
  } = useProducts();

  useEffect(() => {
    updateProductDetail(match);
    updateProductDetailURL();

    return () => {
      resetProductDetail();
    };
  }, []);

  return (
    <PageWrapper>
      <ProductDetail
        product={product}
        onImageError={onImageError}
        addItemToCart={addItemToCart}
      />
    </PageWrapper>
  );
};

export default Details;

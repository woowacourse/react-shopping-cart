import { useLocation } from 'react-router';
import { useProduct } from '../../../hooks';
import ProductDetailCard from '../../ProductDetailCard';
import { Main, Page } from './index.styles';

const ProductDetail = () => {
  const location = useLocation();
  const { product } = location.state;
  const { addToCart } = useProduct();

  return (
    <Page>
      <Main>
        <ProductDetailCard
          {...product}
          imageUrl={product.image_url}
          onCartButtonClick={() => addToCart(product)}
        />
      </Main>
    </Page>
  );
};

export default ProductDetail;

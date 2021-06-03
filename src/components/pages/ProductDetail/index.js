import { useLocation } from 'react-router';
import ProductDetailCard from '../../ProductDetailCard';
import { Main, Page } from './index.styles';

const ProductDetail = () => {
  const location = useLocation();
  const { product } = location.state;

  return (
    <Page>
      <Main>
        <ProductDetailCard {...product} />
      </Main>
    </Page>
  );
};

export default ProductDetail;

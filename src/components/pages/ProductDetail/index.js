import { useLocation } from 'react-router';
import ProductDetailCard from '../../ProductDetailCard';
import { Main, Page } from './index.styles';

const ProductDetail = ({ onCartButtonClick = () => {} }) => {
  const location = useLocation();
  const { product } = location.state;

  return (
    <Page>
      <Main>
        <ProductDetailCard
          {...product}
          onCartButtonClick={event => onCartButtonClick(event, product)}
        />
      </Main>
    </Page>
  );
};

export default ProductDetail;

import ProductDetailCard from '../../ProductDetailCard';
import { Main, Page } from './index.styles';

const ProductDetail = props => {
  const { product } = props.location.state;

  return (
    <Page>
      <Main>
        <ProductDetailCard {...product} />
      </Main>
    </Page>
  );
};

export default ProductDetail;

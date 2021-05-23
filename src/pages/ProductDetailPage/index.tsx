import { VFC } from 'react';
import { RouteComponentProps, useRouteMatch } from 'react-router';
import Loading from '../../components/Loading';
import ProductDetailSection from '../../components/ProductDetail';
import Template from '../../components/shared/Template';
import useFetch from '../../hooks/useFetch';
import { requestProduct } from '../../service/request/productList';
import { Product } from '../../types';

interface MatchParams {
  productId: string;
}

const ProductDetailPage: VFC<RouteComponentProps<MatchParams>> = ({ match }) => {
  const productId = Number(match.params.productId);

  const product = useFetch(() => requestProduct(productId));

  return (
    <Template>
      {product.isLoading ? <Loading /> : <ProductDetailSection product={product.data as Product} />}
    </Template>
  );
};

export default ProductDetailPage;

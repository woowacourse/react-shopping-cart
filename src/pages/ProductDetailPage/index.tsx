import { useMemo } from 'react';
import { useHistory, useParams } from 'react-router';
import InitialLoading from '../../components/shared/InitialLoading';
import RootTemplate from '../../components/shared/RootTemplate';
import { ERROR } from '../../constants/error';
import useRequest from '../../hooks/shared/useRequest';
import { requestProductList } from '../../service/request/productList';
import { KRCurrency } from '../../utils/format';
import {
  ProductDetailButton,
  ProductDetailCard,
  ProductDetailHeading,
  ProductDetailPrice,
} from './styles';

const ProductDetailPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const { data: productList, isLoading } = useRequest(requestProductList);
  const targetProduct = useMemo(() => {
    if (!productList) {
      return null;
    }

    const target = productList.find(({ id }) => id === productId);

    if (!target) {
      throw new Error(ERROR.NOT_FOUND);
    }

    return target;
  }, [productList]);

  return (
    <RootTemplate>
      <InitialLoading isLoading={isLoading}>
        {targetProduct && (
          <ProductDetailCard image={targetProduct.image} type="vertical" width="41.25rem">
            <ProductDetailHeading>{targetProduct.name}</ProductDetailHeading>
            <ProductDetailPrice>
              <span>금액</span>
              <span>{KRCurrency(targetProduct.price)}</span>
            </ProductDetailPrice>
            <ProductDetailButton>장바구니</ProductDetailButton>
          </ProductDetailCard>
        )}
      </InitialLoading>
    </RootTemplate>
  );
};

export default ProductDetailPage;

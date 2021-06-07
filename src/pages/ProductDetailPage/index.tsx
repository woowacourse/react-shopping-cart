import { useMemo } from 'react';
import { useParams } from 'react-router';
import InitialLoading from '../../components/shared/InitialLoading';
import RootTemplate from '../../components/shared/RootTemplate';
import { ERROR_TYPE, ERROR_FOR_DEVELOPER } from '../../constants/error';
import { CONFIRM } from '../../constants/message';
import useRequest from '../../hooks/shared/useRequest';
import useCartAddItem from '../../hooks/useCartItems/useCartAddItem';
import { requestProductList } from '../../service/request/productList';
import CustomError from '../../utils/CustomError';
import { KRCurrency } from '../../utils/format';
import {
  ProductDetailButton,
  ProductDetailCard,
  ProductDetailHeading,
  ProductDetailPrice,
} from './styles';

const ProductDetailPage = () => {
  const { addItem } = useCartAddItem();
  const { productId } = useParams<{ productId: string }>();
  const { data: productList, isLoading } = useRequest(requestProductList);
  const targetProduct = useMemo(() => {
    if (!productList) {
      return null;
    }

    const target = productList.find(({ id }) => id === productId);

    if (!target) {
      throw new CustomError(ERROR_TYPE.NOT_FOUND, '');
    }

    return target;
  }, [productList]);

  const onClickAddCart = () => {
    if (!window.confirm(CONFIRM.ADD_CART)) return;

    if (!targetProduct) {
      console.error(ERROR_FOR_DEVELOPER.NONE_OF_PRODUCT_DATA);
      return;
    }

    addItem(targetProduct);
  };

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
            <ProductDetailButton type="button" onClick={onClickAddCart}>
              장바구니
            </ProductDetailButton>
          </ProductDetailCard>
        )}
      </InitialLoading>
    </RootTemplate>
  );
};

export default ProductDetailPage;

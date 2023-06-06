import * as styled from './Product.styled';
import { ErrorBoundary } from 'react-error-boundary';

import { useCartRepository, useFindCartItemByProductId } from '../../recoils/recoilCart';

import { FallbackRender } from '../FallbackRender/FallbackRender';
import { Stepper } from '../common/Stepper/Stepper';

import { CartAddIcon } from '../../assets/svg';

import { ProductType } from '../../types';

interface Props {
  item: ProductType;
}

export const Product = ({ item }: Props) => {
  const { addCartItem } = useCartRepository();
  const cartItem = useFindCartItemByProductId(item.id);

  const onClickCartIcon = () => {
    addCartItem({ productId: item.id });
  };

  return (
    <styled.Container>
      <styled.ProductImage path={item.imageUrl} />
      <styled.ProductInfo>
        <div>
          <styled.ProductName>{item.name}</styled.ProductName>
          <styled.ProductPrice>{item.price.toLocaleString('ko-KR')}원</styled.ProductPrice>
        </div>
        {cartItem ? (
          <styled.StepperWrapper>
            <ErrorBoundary fallbackRender={FallbackRender}>
              <Stepper cartId={cartItem.id} quantity={cartItem.quantity || 1} />
            </ErrorBoundary>
          </styled.StepperWrapper>
        ) : (
          <styled.CartIconWrapper onClick={onClickCartIcon}>
            <CartAddIcon />
          </styled.CartIconWrapper>
        )}
      </styled.ProductInfo>
    </styled.Container>
  );
};

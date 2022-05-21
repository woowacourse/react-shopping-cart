import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import FlexWrapper from 'components/@shared/FlexWrapper/FlexWrapper';
import ProductName from 'components/@shared/ProductName/ProductName';
import ProductPrice from 'components/@shared/ProductPrice/ProductPrice';
import ProductThumbnail from 'components/@shared/ProductThumbnail/ProductThumbnail';
import WithSpinner from 'components/@shared/WithSpinner/WithSpinner';

import ShoppingCartButton from 'components/ShoppingCartButton/ShoppingCartButton';

import { fetchCartsStart } from 'redux/carts/carts.action';
import {
  selectIsCartsLoading,
  selectCurrentCarts,
} from 'redux/carts/carts.selector';
import { fetchProductStart } from 'redux/products/products.action';
import {
  selectDetailProduct,
  selectIsProductsLoading,
} from 'redux/products/products.selector';

import useCart from 'hooks/useCart';

import { CURRENT_USER } from 'constants/index';
import { isInCart } from 'utils/check';

function ProductDetailPage() {
  const { idx } = useParams();
  const dispatch = useDispatch();
  const product = useSelector(selectDetailProduct);
  const carts = useSelector(selectCurrentCarts);
  const isCartsLoading = useSelector(selectIsCartsLoading);
  const isProductsLoading = useSelector(selectIsProductsLoading);
  const isCartItem = isInCart(idx, carts);
  const { handleAddProductToCart, handleDeleteProductFromCart } = useCart();

  useEffect(() => {
    dispatch(fetchCartsStart());
    dispatch(fetchProductStart(idx));
  }, [dispatch, idx]);

  return (
    // THINK: page 컴포넌트의 추상화레벨을 맞춰야할 것 같은데, 맞을까?
    // THINK: product 없이는 왜 안될까?
    product && (
      <WithSpinner isLoading={isCartsLoading || isProductsLoading}>
        <FlexWrapper
          flexDirection="column"
          gap="20px"
          width="425px"
          ml="auto"
          mr="auto"
        >
          <ProductThumbnail
            // TODO: type-> size로 변경
            type="detail"
            src={product.thumbnail}
            alt={product.name}
          />
          <ProductName type="detail">{product.name}</ProductName>
          <FlexWrapper
            gap="300px"
            bt="2px solid"
            bColor="gray_01"
            width="100%"
            padding="15px 0px"
          >
            <div>금액</div>
            <ProductPrice type="detail">{product.price}원</ProductPrice>
          </FlexWrapper>
          {/* //TODO: 네이밍변경 */}
          <ShoppingCartButton
            $isincart={isCartItem}
            onClick={
              isCartItem
                ? (e) => handleDeleteProductFromCart(e, `${CURRENT_USER}${idx}`)
                : (e) =>
                    handleAddProductToCart(e, {
                      name: product.name,
                      price: product.price,
                      id: idx,
                      thumbnail: product.thumbnail,
                    })
            }
          >
            {isCartItem ? '장바구니에서 제거' : '장바구니에 추가'}
          </ShoppingCartButton>
        </FlexWrapper>
      </WithSpinner>
    )
  );
}

export default ProductDetailPage;

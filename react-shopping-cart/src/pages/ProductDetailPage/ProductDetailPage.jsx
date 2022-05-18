import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import ProductName from 'components/@shared/ProductName/ProductName';
import ProductPrice from 'components/@shared/ProductPrice/ProductPrice';
import ProductThumbnail from 'components/@shared/ProductThumbnail/ProductThumbnail';
import WithSpinner from 'components/@shared/WithSpinner/WithSpinner';

import ShoppingCartButton from 'components/ShoppingCartButton/ShoppingCartButton';

import {
  selectCartsLoading,
  selectCurrentCarts,
} from 'redux/carts/carts.selector';
import { fetchProductDetailStart } from 'redux/products/products.action';
import {
  selectDetailProduct,
  selectProductsLoading,
} from 'redux/products/products.selector';

import useClickCartButton from 'hooks/useClickCartButton';

import { ColumnFlexWrapper, RowFlexWrapper } from 'styles/Wrapper';

import { CURRENT_USER } from 'constants/index';
import { isInCart } from 'utils/check';

function ProductDetailPage() {
  const { idx } = useParams();
  const product = useSelector(selectDetailProduct);
  const carts = useSelector(selectCurrentCarts);
  const cartsLoading = useSelector(selectCartsLoading);
  const productsLoading = useSelector(selectProductsLoading);

  const dispatch = useDispatch();
  const { handleAddProductToCart, handleDeleteProductFromCart } =
    useClickCartButton();

  const isCartItem = isInCart(idx, carts);

  useEffect(() => {
    dispatch(fetchProductDetailStart(idx));
  }, [dispatch, idx]);

  return (
    // THINK: page 컴포넌트의 추상화레벨을 맞춰야할 것 같은데, 맞을까?
    product && (
      <WithSpinner loading={cartsLoading || productsLoading}>
        <ColumnFlexWrapper gap="20px" width="425px" ml="auto" mr="auto">
          <ProductThumbnail type="detail" src={product.image} />
          <ProductName type="detail">{product.name}</ProductName>
          <RowFlexWrapper
            gap="300px"
            bt="2px"
            bColor="gray_01"
            width="100%"
            padding="15px 0px"
          >
            <div>금액</div>
            <ProductPrice type="detail">{product.price}원</ProductPrice>
          </RowFlexWrapper>
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
                      thumbnail: product.image,
                    })
            }
          >
            {isCartItem ? '장바구니에서 제거' : '장바구니에 추가'}
          </ShoppingCartButton>
        </ColumnFlexWrapper>
      </WithSpinner>
    )
  );
}

export default ProductDetailPage;

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import * as productsThunk from 'actions/products/thunk';
import * as cartThunk from 'actions/cart/thunk';

import useCart from 'hooks/useCart';

import { SwitchAsync, Case } from 'components/@common/SwitchAsync';
import { StatusMessage } from 'components/@common';
import ProductItem from 'components/ProductItem';

import * as S from './styles';

export function ProductList() {
  const dispatch = useDispatch();

  const productState = useSelector((state) => state.products);
  const { productList, listAsyncState: productsAsyncState } = productState;

  const { state: cartState } = useCart();
  const { cartItems, cartListAsyncState } = cartState;

  useEffect(() => {
    dispatch(productsThunk.getList());
  }, []);

  const handleAddCart = ({ id, image, name, price }) => {
    dispatch(cartThunk.addList({ id, image, name, price })).then(() => {
      cartListAsyncState.isLoaded && alert('해당 상품을 장바구니에 추가하였습니다.');
    });
  };

  const handleRemoveCart = ({ id }) => {
    dispatch(cartThunk.removeItem(id)).then(() => {
      cartListAsyncState.isLoaded && alert('해당 상품을 장바구니에서 제거하였습니다.');
    });
  };

  return (
    <SwitchAsync
      isLoading={productsAsyncState.isLoading}
      isError={!!productsAsyncState.errorMessage}
      isContentLoaded={productList.length > 0}
    >
      <Case.Success>
        <S.Container>
          {productList &&
            productList.map(({ id, name, goodsPrice, listImage }) => {
              const cartItem = cartItems.find(({ product }) => product === id);

              return (
                <ProductItem
                  key={id}
                  id={id}
                  image={listImage}
                  name={name}
                  price={goodsPrice}
                  cartId={cartItem ? cartItem.id : null}
                  onClickCartButton={
                    cartItem ? () => handleRemoveCart({ id: cartItem.id }) : handleAddCart
                  }
                />
              );
            })}
        </S.Container>
      </Case.Success>

      <Case.Loading>
        <StatusMessage status="loading">상품 목록을 불러오고 있습니다.</StatusMessage>
      </Case.Loading>

      <Case.Error>
        <StatusMessage status="error">{productsAsyncState.errorMessage}</StatusMessage>
      </Case.Error>
    </SwitchAsync>
  );
}
export default ProductList;

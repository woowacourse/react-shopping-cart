import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductList } from 'actions/products/thunk';

import useCart from 'hooks/useCart';

import { SwitchAsync, Case } from 'components/@common/SwitchAsync';
import { StatusMessage } from 'components/@common';
import ProductItem from 'components/ProductItem';

import * as S from './styles';

export function ProductList() {
  const dispatch = useDispatch();

  const productState = useSelector((state) => state.products);
  const { content: products, isLoading, error: errorMessage } = productState.productInfo;

  const { action: cartAction, state: cartState } = useCart();
  const { cartItems } = cartState;

  useEffect(() => {
    dispatch(getProductList());
  }, []);

  const handleAddCart = ({ id, image, name, price }) => {
    cartAction.addItem({ id, image, name, price }).then(() => {
      cartState.isLoaded && alert('해당 상품을 장바구니에 추가하였습니다.');
    });
  };

  const handleRemoveCart = ({ id }) => {
    cartAction.removeItem(id).then(() => {
      cartState.isLoaded && alert('해당 상품을 장바구니에서 제거하였습니다.');
    });
  };

  return (
    <SwitchAsync
      isLoading={isLoading}
      isError={!!errorMessage}
      isContentLoaded={products.length > 0}
    >
      <Case.Success>
        <S.Container>
          {products &&
            products.map(({ id, name, goodsPrice, listImage }) => {
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
        <StatusMessage status="error">{errorMessage}</StatusMessage>
      </Case.Error>
    </SwitchAsync>
  );
}
export default ProductList;

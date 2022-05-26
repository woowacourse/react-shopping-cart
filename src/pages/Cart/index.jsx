import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import Text from 'components/Text';

import DeleteProductCartErrorModal from 'containers/DeleteProductCartErrorModal';
import CartProductMaxCountModal from 'containers/CartProductMaxCountModal';

import { useCart } from 'hooks';

import Cart from 'templates/Cart';
import { LoadingWrapperStyled } from 'pages/Product/style';

import { GET_PRODUCT_CART_FAIL } from 'modules/cart';

import { CartPageStyled } from './style';

function CartPage() {
  const { isCartProductsLoading, requestCartProductFail, cartProducts, requestCartProducts } =
    useCart();
  const { openDeleteProductCartErrorModal, openCartProductMaxCountModal } = useSelector(
    (state) => state.modal,
  );

  useEffect(() => {
    requestCartProducts();
  }, []);

  if (isCartProductsLoading) {
    return (
      <LoadingWrapperStyled>
        <Text color="#333333" fontSize="30px" fontWeight="800">
          로딩중...
        </Text>
      </LoadingWrapperStyled>
    );
  }

  if (requestCartProductFail === GET_PRODUCT_CART_FAIL) {
    return (
      <Text color="#333333" fontSize="30px" fontWeight="800">
        장바구니 정보를 불러오는데 실패하였습니다.
      </Text>
    );
  }

  return (
    <>
      {openDeleteProductCartErrorModal && <DeleteProductCartErrorModal />}
      {openCartProductMaxCountModal && <CartProductMaxCountModal />}
      <CartPageStyled>
        <Cart cartProducts={cartProducts} />
      </CartPageStyled>
    </>
  );
}

export default CartPage;

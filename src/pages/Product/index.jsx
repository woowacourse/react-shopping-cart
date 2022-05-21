import React, { useEffect } from 'react';
import { useProducts } from 'hooks';
import { useSelector } from 'react-redux';

import { ProductListStyled, LoadingWrapperStyled } from './style';

import Text from 'components/Text';

import AlreadyCartModal from 'containers/AlreadyInCartModal';
import AddCartModal from 'containers/AddCartModal';
import AddCartErrorModal from 'containers/AddCartErrorModal';

import Product from 'templates/Product';

import { GET_PRODUCT_FAIL } from 'modules/product';

function ProductListPage() {
  const { isProductLoading, requestProductFail, products, requestProduct } = useProducts();
  const { openAlreadyInCartModal, openAddCartModal, openAddCartErrorModal } = useSelector(
    (state) => state.modal,
  );

  useEffect(() => {
    requestProduct();
  }, []);

  if (isProductLoading) {
    return (
      <LoadingWrapperStyled>
        <Text color="#333333" fontSize="30px" fontWeight="800">
          로딩중...
        </Text>
      </LoadingWrapperStyled>
    );
  }

  if (requestProductFail === GET_PRODUCT_FAIL) {
    return (
      <Text color="#333333" fontSize="30px" fontWeight="800">
        상품 정보를 불러오는데 실패하였습니다.
      </Text>
    );
  }

  return (
    <>
      {openAlreadyInCartModal && <AlreadyCartModal />}
      {openAddCartModal && <AddCartModal />}
      {openAddCartErrorModal && <AddCartErrorModal />}
      <ProductListStyled>
        {products.map((product) => (
          <Product key={product.product_id} {...product} />
        ))}
      </ProductListStyled>
    </>
  );
}

export default ProductListPage;

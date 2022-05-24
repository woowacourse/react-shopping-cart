import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {useSelector, useDispatch} from 'react-redux';

import {getProductList} from 'store/modules/productList';

import ErrorPendingBoundary from 'component/common/ErrorPendingBoundary';
import Item from 'component/Item';
import * as S from 'page/ProductListPage/style';
import Empty from 'assets/empty.png';

import useCartItem from 'hook/useCartItem';

export default function ProductListPage() {
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productListReducer.productList);
  const pending = useSelector((state) => state.productListReducer.pending);

  const {initializeCartList} = useCartItem();

  useEffect(() => {
    dispatch(getProductList());
    initializeCartList();
  }, [dispatch, initializeCartList]);

  return (
    <S.ProductListPageLayout>
      <ErrorPendingBoundary
        fallback={<img src={Empty} alt="비어있음" height="600px" />}
        pending={pending}
        error={!productList.length}
      >
        <S.ProductListBox>
          {productList.map((productInfo) => (
            <Item productInfo={productInfo} key={productInfo.id} />
          ))}
        </S.ProductListBox>
      </ErrorPendingBoundary>
    </S.ProductListPageLayout>
  );
}

ProductListPage.propTypes = {
  itemList: PropTypes.array,
};

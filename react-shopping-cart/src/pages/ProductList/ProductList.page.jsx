import { useEffect } from 'react';
import { Error, FlexWrapper } from 'components/@shared';
import ProductListContainer from 'components/ProductListContainer/ProductListContainer.component';
import Loading from 'components/Loading/Loading.component';
import { useReduxState } from 'hooks';
import { fetchPostList } from 'actions/productList';
import STATE_KEY from 'constants/stateKey';
import STATUS from 'constants/status';

function ProductList() {
  const {
    state: { productList, status },
    dispatch,
  } = useReduxState(STATE_KEY.PRODUCT_LIST_REDUCER);

  useEffect(() => {
    if (!productList.length) {
      dispatch(fetchPostList());
    }
  }, []);

  return (
    <FlexWrapper style={{ margin: '60px 0 60px' }} isColumnDirection={true}>
      {status === STATUS.LOADING ? (
        <Loading />
      ) : status === STATUS.ERROR ? (
        <Error>서버에 연결할 수 없습니다.</Error>
      ) : (
        <ProductListContainer productList={productList} />
      )}
    </FlexWrapper>
  );
}

export default ProductList;

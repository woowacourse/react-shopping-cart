import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Header from 'components/Header/Header.component';
import PageContainer from 'components/@shared/PageContainer/PageContainer.component';
import ProductListContainer from 'components/ProductListContainer/ProductListContainer.component';
import Loading from 'components/Loading/Loading.component';
import Error from 'components/@shared/Error/Error.component';
import useFetch from 'hooks/useFetch';
import { addItem, deleteItem } from 'redux/actions';

function ProductList() {
  const dispatch = useDispatch();
  const shoppingCart = useSelector(state => state.shoppingCart);

  const { data, isLoading, error } = useFetch(`${process.env.REACT_APP_API_HOST}/product`);

  const handleToggleShoppingCart = useCallback((id, isContained) => {
    dispatch(isContained ? deleteItem(id) : addItem(id));
  }, []);

  const checkContainedProduct = id => {
    return shoppingCart.find(itemInfo => itemInfo.id === id) !== undefined;
  };

  return (
    <>
      <Header />
      <PageContainer>
        {isLoading ? (
          <Loading />
        ) : error ? (
          <Error>서버에 연결할 수 없습니다.</Error>
        ) : (
          <ProductListContainer
            data={data}
            handleToggleShoppingCart={handleToggleShoppingCart}
            checkContainedProduct={checkContainedProduct}
          />
        )}
      </PageContainer>
    </>
  );
}

export default ProductList;

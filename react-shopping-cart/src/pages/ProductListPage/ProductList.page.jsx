import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import Header from 'components/Header/Header.component';
import PageContainer from 'components/@shared/PageContainer/PageContainer.component';
import ProductListItem from 'components/ProductListItem/ProductListItem.component';
import Loading from 'components/Loading/Loading.component';
import Error from 'components/@shared/Error/Error.component';
import useFetch from 'hooks/useFetch';
import { addItem, deleteItem } from 'actions';

const ProductListBox = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 45px;
`;

function ProductList() {
  const dispatch = useDispatch();
  const shoppingCart = useSelector(state => state.shoppingCart);

  const { data, isLoading, error } = useFetch(`${process.env.REACT_APP_API_HOST}/product`);

  const handleToggleShoppingCart = (id, isContained) => {
    dispatch(isContained ? deleteItem(id) : addItem(id));
  };

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
          <ProductListBox>
            {data.map(itemInfo => (
              <ProductListItem
                key={itemInfo.id}
                {...itemInfo}
                isContained={checkContainedProduct(itemInfo.id)}
                handleToggleShoppingCart={handleToggleShoppingCart}
              />
            ))}
          </ProductListBox>
        )}
      </PageContainer>
    </>
  );
}

export default ProductList;

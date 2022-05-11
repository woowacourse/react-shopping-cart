import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import Header from 'components/Header/Header.component';
import PageContainer from 'components/@shared/PageContainer/PageContainer.component';
import ProductListItem from 'components/ProductListItem/ProductListItem.component';
import useFetch from 'hooks/useFetch';
import { addItem, deleteItem } from 'actions';

const ProductListBox = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 45px;
`;

function ProductList() {
  const dispatch = useDispatch();
  const shoppingCart = useSelector(state => state);

  const { data, isLoading, error } = useFetch('http://localhost:3001/product');

  console.log(shoppingCart);

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
        <ProductListBox>
          {isLoading ? (
            <p>로딩중 입니다..</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            data.map(itemInfo => (
              <ProductListItem
                key={itemInfo.id}
                {...itemInfo}
                isContained={checkContainedProduct(itemInfo.id)}
                handleToggleShoppingCart={handleToggleShoppingCart}
              />
            ))
          )}
        </ProductListBox>
      </PageContainer>
    </>
  );
}

export default ProductList;

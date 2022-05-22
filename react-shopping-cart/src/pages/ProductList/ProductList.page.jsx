import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Header from 'components/Header/Header.component';
import PageContainer from 'components/@shared/PageContainer/PageContainer.component';
import ProductListContainer from 'components/ProductListContainer/ProductListContainer.component';
import useFetch from 'hooks/useFetch';
import { addItem, deleteItem } from 'redux/actions/shoppingCart.action';
import SkeletonItem from 'components/SkeletonItem/SkeletonItem.component';
import ProductListBox from 'components/ProductListBox/ProductListBox.component';

function LoadingSection() {
  return (
    <ProductListBox>
      {new Array(8).fill('').map((_, idx) => (
        <SkeletonItem key={idx} />
      ))}
    </ProductListBox>
  );
}

function ProductList() {
  const dispatch = useDispatch();
  const shoppingCart = useSelector(state => state.shoppingCart);

  const { data, isLoading } = useFetch(`${process.env.REACT_APP_API_HOST}/product`);

  const handleToggleShoppingCart = useCallback(
    (id, isContained) => {
      dispatch(isContained ? deleteItem(id) : addItem(id));
    },
    [dispatch]
  );

  const checkContainedProduct = id => {
    return shoppingCart.find(itemInfo => itemInfo.id === id) !== undefined;
  };

  return (
    <>
      <Header />
      <PageContainer>
        {isLoading ? (
          <LoadingSection />
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

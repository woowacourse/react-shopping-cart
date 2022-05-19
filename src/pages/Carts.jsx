import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import CartListContainer from '../components/CartsList/CartListContainer';
import CheckedItemsController from '../components/CheckBox/CheckedItemsController';
import { BasicDivideLine, Flex } from '../components/shared/basics';
import TotalPrice from '../components/TotalPrice/TotalPrice';
import API_URL from '../constants/api';
import PATH from '../constants/path';
import useFetch from '../hooks/useFetch';

function Carts() {
  const { carts } = useSelector((state) => state.carts);
  const query = carts.length
    ? carts.map((cart) => `id=${cart.id}`).join('&')
    : '';
  const {
    isLoading: isStoredProductsLoading,
    result: storedProducts,
    apiCall,
  } = useFetch({
    url: `${API_URL}/${PATH.PRODUCTS}?${query}`,
  });

  useEffect(() => {
    apiCall();
  }, [query]);

  return (
    <Style.Container>
      <Style.Header>
        <Style.Title>장바구니</Style.Title>
        <BasicDivideLine weight="bold" mv="20" />
      </Style.Header>

      <Style.CartListContainer justify="space-between">
        <Style.CartListWrapper>
          <CheckedItemsController />
          <span>{`든든배송 상품(${carts?.length}개)`}</span>
          <BasicDivideLine weight="bold" color="lightgray" mv="10" />
          {!isStoredProductsLoading && (
            <CartListContainer storedProducts={storedProducts} />
          )}
        </Style.CartListWrapper>
        <TotalPrice />
      </Style.CartListContainer>
    </Style.Container>
  );
}

export default Carts;

const Style = {
  Container: styled.section`
    padding: 24px 300px;
  `,
  Header: styled.header`
    display: flex;
    flex-direction: column;
    margin-top: 20px;
  `,
  Title: styled.h2`
    font-size: 24px;
    font-weight: 600;
    text-align: center;
  `,
  CartListContainer: styled(Flex)`
    padding: 0 20px;
  `,
  CartListWrapper: styled.div`
    width: 60%;
  `,
};

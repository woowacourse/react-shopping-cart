import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import CartListContainer from '../components/CartsList/CartListContainer';
import CheckedItemsController from '../components/CheckBox/CheckedItemsController';
import { BasicDivideLine, Flex } from '../components/shared/basics';
import TotalPrice from '../components/TotalPrice/TotalPrice';
import PATH from '../constants/path';
import useFetch from '../hooks/useFetch';

function Carts() {
  const { carts, checkedProducts } = useSelector((state) => state.carts);
  const query = carts.map((cart) => cart.id).join('&');
  const {
    isLoading: isStoredProductsLoading,
    result: storedProducts,
    apiCall: loadStoredProducts,
  } = useFetch({
    url: `${PATH.PRODUCTS}/${query}`,
  });

  const [checkedProductsInfo, setCheckedProductsInfo] =
    useState(storedProducts);

  useEffect(() => {
    if (!carts.length) {
      return;
    }

    loadStoredProducts();
  }, [query]);

  useEffect(() => {
    const ids = checkedProducts.map((product) => product.id);
    const productInfos = storedProducts.filter((product) =>
      ids.includes(product.id)
    );
    setCheckedProductsInfo(productInfos);
  }, [checkedProducts, storedProducts]);

  const totalPrice = Number(
    checkedProductsInfo?.reduce((acc, cur) => acc + +cur.price, 0)
  ).toLocaleString('ko-kr');

  return (
    <Style.Container>
      <Style.Header>
        <Style.Title>장바구니</Style.Title>
        <BasicDivideLine weight="bold" mv="20" />
      </Style.Header>

      <Style.CartListContainer justify="space-between">
        <Style.CartListWrapper>
          <CheckedItemsController checkedProducts={checkedProducts} />
          <span>{`든든배송 상품(${checkedProductsInfo?.length}개)`}</span>
          <BasicDivideLine weight="bold" color="lightgray" mv="10" />
          {!isStoredProductsLoading && (
            <CartListContainer
              storedProducts={storedProducts}
              checkedProducts={checkedProducts}
            />
          )}
        </Style.CartListWrapper>
        <TotalPrice total={totalPrice} quantity={checkedProductsInfo.length} />
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

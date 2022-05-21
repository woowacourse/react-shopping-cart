import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import CartListContainer from '../components/CartsList/CartListContainer';
import CheckedItemsController from '../components/CheckBox/CheckedItemsController';
import { BasicDivideLine, Flex } from '../components/shared/basics';
import TotalPrice from '../components/TotalPrice/TotalPrice';
import useFetch from '../hooks/useFetch';
import usePropDefaultState from '../hooks/usePropDefaultState';
import useUser from '../hooks/useUser';

function Carts() {
  const { carts, checkedCarts } = useSelector((state) => state.carts);

  const { userId } = useUser();
  const {
    isLoading: isStoredProductsLoading,
    result: storedProducts,
    apiCall: loadStoredProducts,
  } = useFetch({
    url: `/cartsInfo/${userId}`,
  });

  const [checkedCartsInfo, setCheckedCartsInfo] =
    usePropDefaultState(storedProducts);

  useEffect(() => {
    const ids = checkedCarts.map((cart) => cart.id);
    const productInfos = storedProducts.filter((product) =>
      ids.includes(product.id)
    );

    setCheckedCartsInfo(productInfos);
  }, [checkedCarts, storedProducts]);

  const totalPrice = Number(
    checkedCartsInfo?.reduce((acc, cur) => acc + +cur.price * +cur.quantity, 0)
  ).toLocaleString('ko-kr');

  useEffect(() => {
    loadStoredProducts();
  }, [carts, userId]);

  return (
    <Style.Container>
      <Style.Header>
        <Style.Title>장바구니</Style.Title>
        <BasicDivideLine weight="bold" mv="20" />
      </Style.Header>

      <Style.CartListContainer justify="space-between">
        <Style.CartListWrapper>
          <CheckedItemsController checkedCarts={checkedCarts} />
          <span>{`든든배송 상품(${checkedCartsInfo?.length}개)`}</span>
          <BasicDivideLine weight="bold" color="lightgray" mv="10" />
          {!isStoredProductsLoading && (
            <CartListContainer
              storedProducts={storedProducts}
              checkedCarts={checkedCarts}
            />
          )}
        </Style.CartListWrapper>
        <TotalPrice total={totalPrice} quantity={checkedCartsInfo.length} />
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

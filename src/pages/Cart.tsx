import React, { useEffect, useState } from 'react';
import TotalAmount from '../components/TotalAmount/TotalAmount';
import ProductList from '../components/ProductList/ProductList';
import Header from '../components/Header/Header';
import styled from 'styled-components';
import Title from '../components/Title/Title';
import Footer from '../components/Footer/Footer';
import { useRecoilState } from 'recoil';
import { fetchProducts } from '../api';
import { itemsState } from '../recoil/atoms';

const CartContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 3.6rem 2.4rem 10.4rem 2.4rem;
  box-sizing: border-box;
  height: 100%;
`;

const NoCartItemContainer = styled.p`
  width: 100%;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 1.6rem;
  font-weight: 400;
  line-height: 1.6rem;
  text-align: center;
`;

function Cart() {
  const [items, setItems] = useRecoilState(itemsState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await fetchProducts();
        setItems(data);
      } catch (error) {
        setError(error as Error);
      }

      setLoading(false);
    };

    fetchData();
  }, [setItems]);

  if (loading) {
    return <NoCartItemContainer>Loading...</NoCartItemContainer>;
  }

  if (error) {
    return <NoCartItemContainer>다시 시도해 주세요.</NoCartItemContainer>;
  }

  return (
    <CartContainer>
      <Header headerIconType="home" />
      <ContentWrapper>
        {items.length !== 0 ? (
          <>
            <Title
              title="장바구니"
              subTitle={`현재 ${items.length}종류의 상품이 담겨있습니다.`}
            />
            <ProductList />
            <TotalAmount />
          </>
        ) : (
          <>
            <Title title="장바구니" />
            <NoCartItemContainer>
              장바구니에 담은 상품이 없습니다.
            </NoCartItemContainer>
          </>
        )}
      </ContentWrapper>

      <Footer isDisabled={items.length === 0} url="/completed" />
    </CartContainer>
  );
}

export default Cart;

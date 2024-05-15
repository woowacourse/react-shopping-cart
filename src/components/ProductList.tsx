import React, { useEffect, useState } from 'react';
import { Products } from '../types/Product';
import ProductCard from './ProductCard';
import { fetchProducts } from '../api';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { itemsState } from '../recoil/atoms';
import styled from 'styled-components';
import CheckBox from './CheckBox';
import { toggleAllSelector } from '../recoil/selectors';

const CheckBoxContainer = styled.div``;

function ProductList() {
  const [items, setItems] = useRecoilState(itemsState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const isAllChecked = useRecoilValue(toggleAllSelector);
  const setAllChecked = useSetRecoilState(toggleAllSelector);

  const handleToggleAll = () => {
    setAllChecked(!isAllChecked);
  };

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
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <CheckBoxContainer>
        <CheckBox isChecked={isAllChecked} onClick={handleToggleAll} />
        전체선택
      </CheckBoxContainer>
      <h2>상품 목록</h2>
      <ul>
        {items.map((product: Products) => {
          return <ProductCard key={product.id} product={product} />;
        })}
      </ul>
    </>
  );
}

export default ProductList;

import React from 'react';
import { Products } from '../../types/Product';
import ProductCard from '../ProductCard/ProductCard';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { itemsState } from '../../recoil/atoms';
import { toggleAllSelector } from '../../recoil/selectors';
import * as S from './ProductList.styled';
import LabeledCheckBox from '../LabeledCheckBox/LabeledCheckBox';

function ProductList() {
  const items = useRecoilValue(itemsState);

  const isAllChecked = useRecoilValue(toggleAllSelector);
  const setAllChecked = useSetRecoilState(toggleAllSelector);

  const handleToggleAll = () => {
    setAllChecked(!isAllChecked);
  };

  return (
    <S.ProductListContainer>
      <LabeledCheckBox
        isAllChecked={isAllChecked}
        handleToggleAll={handleToggleAll}
      />
      <S.CartItemListContainer>
        {items.map((product: Products) => {
          return <ProductCard key={product.id} product={product} />;
        })}
      </S.CartItemListContainer>
    </S.ProductListContainer>
  );
}

export default ProductList;

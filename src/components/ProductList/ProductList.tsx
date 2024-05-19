import React from 'react';
import { Products } from '../../types/Product';
import ProductCard from '../ProductCard/ProductCard';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { itemsState } from '../../recoil/atoms';
import CheckBox from '../CheckBox/CheckBox';
import { toggleAllSelector } from '../../recoil/selectors';
import { MESSAGES } from '../../constants/Messages';
import * as S from './ProductList.styled';

function ProductList() {
  const items = useRecoilValue(itemsState);

  const isAllChecked = useRecoilValue(toggleAllSelector);
  const setAllChecked = useSetRecoilState(toggleAllSelector);

  const handleToggleAll = () => {
    setAllChecked(!isAllChecked);
  };

  return (
    <S.ProductListContainer>
      <S.CheckBoxContainer>
        <CheckBox isChecked={isAllChecked} onClick={handleToggleAll} />
        {MESSAGES.allSelected}
      </S.CheckBoxContainer>

      <S.CartItemListContainer>
        {items.map((product: Products) => {
          return <ProductCard key={product.id} product={product} />;
        })}
      </S.CartItemListContainer>
    </S.ProductListContainer>
  );
}

export default ProductList;

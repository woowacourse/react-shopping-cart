import { useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { cartData } from '../../recoil/atoms';
import { allCartItemsCheckState } from '../../recoil/selectors';

import CheckBox from '../CheckBox/CheckBox';
import ProductItem from '../ProductItem/ProductItem';
import ProductTotalPriceList from '../ProductTotalPriceList/ProductTotalPriceList';

import {
  CheckBoxGroup,
  CheckBoxText,
  ProductListStyle,
} from './ProductList.style';

export default function ProductList() {
  const cart = useRecoilValue(cartData);
  const setAllCartItemsCheckState = useSetRecoilState(allCartItemsCheckState);
  const [isChecked, setIsChecked] = useState(false);

  const handleToggleAllCheck = () => {
    setIsChecked(!isChecked);
    setAllCartItemsCheckState(!isChecked);
  };

  return (
    <ProductListStyle>
      <CheckBoxGroup>
        <CheckBox isCheck={isChecked} onClick={handleToggleAllCheck} />
        <CheckBoxText>전체선택</CheckBoxText>
      </CheckBoxGroup>
      {cart.map((cartItem) => {
        return <ProductItem cartItem={cartItem} key={cartItem.id} />;
      })}
      <ProductTotalPriceList />
    </ProductListStyle>
  );
}

import { useRecoilState, useRecoilValue } from 'recoil';
import { cartData } from '../../recoil/atoms';
import { allCartItemsCheckState } from '../../recoil/selectors';

import CheckBox from '../CheckBox/CheckBox';
import ProductItem from '../ProductItem/ProductItem';
import ProductTotalPriceList from '../ProductTotalPriceList/ProductTotalPriceList';

import * as PL from './ProductList.style';

export default function ProductList() {
  const cart = useRecoilValue(cartData);

  const [isAllCheck, setIsAllCheck] = useRecoilState(allCartItemsCheckState);

  const handleToggleAllCheck = () => {
    setIsAllCheck(!isAllCheck);
  };

  return (
    <PL.ProductListStyle>
      <PL.CheckBoxGroup>
        <CheckBox isCheck={isAllCheck} onClick={handleToggleAllCheck} />
        <PL.CheckBoxText>전체선택</PL.CheckBoxText>
      </PL.CheckBoxGroup>
      {cart.map((cartItem) => {
        return <ProductItem cartItem={cartItem} key={cartItem.id} />;
      })}
      <ProductTotalPriceList />
    </PL.ProductListStyle>
  );
}

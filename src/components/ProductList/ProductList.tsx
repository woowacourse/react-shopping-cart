import { useRecoilState, useRecoilValue } from 'recoil';
import { cartData } from '../../recoil/atoms/atoms';
import { allCartItemsCheckState } from '../../recoil/selectors/selectors';

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

  const [isAllCheck, setIsAllCheck] = useRecoilState(allCartItemsCheckState);

  const handleToggleAllCheck = () => {
    setIsAllCheck(!isAllCheck);
  };

  return (
    <ProductListStyle>
      <CheckBoxGroup>
        <CheckBox isCheck={isAllCheck} onClick={handleToggleAllCheck} />
        <CheckBoxText>전체선택</CheckBoxText>
      </CheckBoxGroup>
      {cart.map((cartItem) => {
        return <ProductItem cartItem={cartItem} key={cartItem.id} />;
      })}
      <ProductTotalPriceList />
    </ProductListStyle>
  );
}

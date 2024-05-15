import CheckBox from '../CheckBox/CheckBox';
import ProductItem from '../ProductItem/ProductItem';
import {
  CheckBoxGroup,
  CheckBoxText,
  ProductListStyle,
} from './ProductList.style';
import ProductTotalPriceList from '../ProductTotalPriceList/ProductTotalPriceList';
import { useRecoilValue } from 'recoil';
import { cartData } from '../../recoil/atoms';

export default function ProductList() {
  const cart = useRecoilValue(cartData);

  return (
    <ProductListStyle>
      <CheckBoxGroup>
        <CheckBox />
        <CheckBoxText>전체선택</CheckBoxText>
      </CheckBoxGroup>
      {cart.map((cartItem) => {
        return <ProductItem cartItem={cartItem} key={cartItem.id} />;
      })}
      <ProductTotalPriceList />
    </ProductListStyle>
  );
}

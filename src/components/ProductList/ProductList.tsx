import CheckBox from '../CheckBox/CheckBox';
import ProductItem from '../ProductItem/ProductItem';
import {
  CheckBoxGroup,
  CheckBoxText,
  ProductListStyle,
} from './ProductList.style';
import ProductTotalPriceList from '../ProductTotalPriceList/ProductTotalPriceList';

export default function ProductList() {
  return (
    <ProductListStyle>
      <CheckBoxGroup>
        <CheckBox />
        <CheckBoxText>전체선택</CheckBoxText>
      </CheckBoxGroup>
      {Array.from({ length: 5 }).map(() => {
        return <ProductItem />;
      })}
      <ProductTotalPriceList />
    </ProductListStyle>
  );
}

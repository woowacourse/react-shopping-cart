import CheckBox from '../CheckBox/CheckBox';
import ProductItem from '../ProductItem/ProductItem';
import { CheckBoxGroup, CheckBoxText } from './ProductList.style';

export default function ProductList() {
  return (
    <section>
      <CheckBoxGroup>
        <CheckBox />
        <CheckBoxText>전체선택</CheckBoxText>
      </CheckBoxGroup>
      {Array.from({ length: 5 }).map(() => {
        return <ProductItem />;
      })}
    </section>
  );
}

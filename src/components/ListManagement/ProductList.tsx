import { useRecoilState, useRecoilValue } from 'recoil';
import { cartData } from '../../recoil/atoms';
import {
  allCartItemsCheckState,
  calculateOrderPrice,
} from '../../recoil/selectors';

import CheckBox from '../CheckBox/CheckBox';
import ProductItem from '../ItemManagement/ProductItem';
import ProductTotalPriceList from '../ProductTotalPriceList/ProductTotalPriceList';

import * as PL from './ProductList.style';

export default function ProductList() {
  const cart = useRecoilValue(cartData);
  const { totalOrderPrice, deliveryFee, totalPrice } =
    useRecoilValue(calculateOrderPrice);

  const priceList: PriceList = {
    0: ['주문 금액', totalOrderPrice],
    1: ['배송비', deliveryFee],
  };

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
      <ProductTotalPriceList priceList={priceList} totalPrice={totalPrice} />
    </PL.ProductListStyle>
  );
}

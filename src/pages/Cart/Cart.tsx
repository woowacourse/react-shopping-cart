import styled from 'styled-components';
import CartList from '../../components/CartList';
import PurchaseBox from '../../components/PurchaseBox';
import {CartTitle, CartWrapper, FatBorder} from "./Cart.style.ts";
import {CartListTitle} from "../../components/CartList/CartList.style.ts";
import {useRecoilValue} from "recoil";
import {cartCountSelector} from "../../recoil/cartAtoms.ts";

/**
 * TODO: 반응형 적용, gap 대신 max-width로 간격 조절하기
 */

function Cart() {
  const cartCount = useRecoilValue(cartCountSelector);
  
  return (
    <div>
      <CartTitle>장바구니</CartTitle>
      <FatBorder/>
      <CartListTitle>든든배송 상품 ({cartCount}개)</CartListTitle>
      <CartWrapper>
        <CartList/>
        <PurchaseBox/>
      </CartWrapper>
    </div>
  );
}

export default Cart;

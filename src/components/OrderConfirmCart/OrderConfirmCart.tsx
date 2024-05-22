import { useRecoilState, useRecoilValue } from 'recoil';
import { specialZoneCheckState } from '../../recoil/atoms/atoms';

import { CartHeaderStyle, SubTitle, Title } from '../CartHeader/CartHeader.style';
import { ProductListStyle } from '../ProductList/ProductList.style';
import ProductTotalPriceList from '../ProductTotalPriceList/ProductTotalPriceList';
import { CartStyle } from '../Cart/Cart.style';
import { checkedCartItems } from '../../recoil/selectors/selectors';
import Button from '../Button/Button';
import CheckBox from '../CheckBox/CheckBox';
import ProductItem from '../ProductItem/ProductItem';

export default function OrderConfirmCart() {
  const cart = useRecoilValue(checkedCartItems);

  const orderProduct = useRecoilValue(checkedCartItems);
  const cartTotalCount = orderProduct.reduce((acc, cartItem) => acc + cartItem.quantity, 0);
  const [isSpecialZoneCheck, setIsSpecialZoneCheck] = useRecoilState(specialZoneCheckState);

  const handleToggleSpecialZoneCheck = () => {
    setIsSpecialZoneCheck(!isSpecialZoneCheck);
  };

  return (
    <div id="orderConfirmPage">
      <CartStyle>
        <CartHeaderStyle>
          <Title>주문 확인</Title>
          <SubTitle>
            총 {orderProduct.length} 종류의 상품 {cartTotalCount}개를 주문합니다.
          </SubTitle>
          <SubTitle>최종 결제 금액을 확인해 주세요.</SubTitle>
        </CartHeaderStyle>

        <ProductListStyle>
          {cart.map((cartItem) => {
            return <ProductItem isCheckBox={false} cartItem={cartItem} key={cartItem.id} />;
          })}

          <Button text="쿠폰 적용" onClick={() => {}} className="couponButton" />

          <CheckBox
            title="배송 정보"
            text="제주도 및 도서 산간 지역"
            isCheck={isSpecialZoneCheck}
            onClick={handleToggleSpecialZoneCheck}
          />

          <ProductTotalPriceList />
        </ProductListStyle>
      </CartStyle>
    </div>
  );
}

import { UpsideDownExclamation } from '@assets/index';
import { BottomButton, LoadingSpinner } from '@components/common';
import CheckBox from '@components/common/Checkbox/Checkbox';
import Item from '@components/common/Item/Item';
import CouponSelectModal from '@components/orderConfirm/CouponSelectModal/CouponSelectModal';
import { ItemCouponButton } from '@components/orderConfirm/ItemCouponButton/ItemCouponButton.styled';
import { OrderPrice } from '@components/shoppingCart';
import { PRICE } from '@constants/shippingCart';
import { useSelectedCartItems } from '@hooks/shoppingCart';
import useOrderCosts from '@hooks/shoppingCart/useOrderCosts';
import { couponListAtom, selectedCouponListAtom } from '@recoil/orderConfirm';
import { cartItemsAtom } from '@recoil/shoppingCart';
import { formatKoreanCurrency } from '@utils/currency';
import { Suspense, useEffect, useState } from 'react';
import { useResetRecoilState } from 'recoil';

import * as Styled from './OrderConfirmPage.styled';

const OrderConfirmPage = () => {
  const { selectedItems, totalSelectedItemLength, selectedTotalQuantity } = useSelectedCartItems();
  const { orderPrice, shippingPrice, afterDiscountTotalPrice, totalDiscountPrice } = useOrderCosts();

  const [isOpen, setIsOpen] = useState(false);

  const resetCouponList = useResetRecoilState(couponListAtom);
  const resetSelectedCouponList = useResetRecoilState(selectedCouponListAtom);
  const resetTotalPrice = useResetRecoilState(cartItemsAtom);

  useEffect(() => {
    resetCouponList();
    resetSelectedCouponList();
    resetTotalPrice();
  }, [resetCouponList, resetSelectedCouponList, resetTotalPrice]);

  return (
    <>
      <Styled.OrderConfirmTitle>주문 확인</Styled.OrderConfirmTitle>
      <Styled.OrderConfirmSubTitle>
        총 {totalSelectedItemLength}종류의 상품 {selectedTotalQuantity}개를 주문합니다. <br /> 최종 결제 금액을
        확인해주세요.
      </Styled.OrderConfirmSubTitle>

      <>
        {selectedItems.map(({ id, quantity, product }) => (
          <Item key={id}>
            <Item.ItemImage url={product.imageUrl} />
            <Item.ItemDescription name={product.name} price={product.price}>
              <Styled.LabelText>{quantity}개</Styled.LabelText>
            </Item.ItemDescription>
          </Item>
        ))}
      </>
      <ItemCouponButton onClick={() => setIsOpen((prev) => !prev)} style={{ margin: '32px 0px' }}>
        쿠폰 적용
      </ItemCouponButton>
      <Suspense fallback={<LoadingSpinner $width="100%" $height="70vh" />}>
        {isOpen && <CouponSelectModal isOpen={isOpen} onToggle={() => setIsOpen((prev) => !prev)} />}
      </Suspense>
      <>
        <Styled.HeadingText>배송 정보</Styled.HeadingText>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', paddingTop: '20px' }}>
          <CheckBox checked />
          <Styled.LabelText>제주도 및 도서 산간 지역</Styled.LabelText>
        </div>
        <Styled.CartInfoBanner>
          <UpsideDownExclamation />
          <Styled.CartInfoBannerText>
            총 주문 금액이 {formatKoreanCurrency(PRICE.freeShippingMinAmount)} 이상일 경우 무료 배송됩니다.
          </Styled.CartInfoBannerText>
        </Styled.CartInfoBanner>
        <OrderPrice
          orderPrice={orderPrice}
          shippingPrice={shippingPrice}
          discountPrice={totalDiscountPrice}
          totalPrice={afterDiscountTotalPrice}
        />
        <BottomButton>주문 확인</BottomButton>
      </>
    </>
  );
};

export default OrderConfirmPage;

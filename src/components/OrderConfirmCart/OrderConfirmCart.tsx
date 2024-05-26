import 'soosoo-react-modal-component/dist/style.css';
import { Modal } from 'soosoo-react-modal-component';

import { specialZoneCheckState, couponDiscountAmount } from '../../recoil/atoms/atoms';
import { checkedCartItems } from '../../recoil/selectors/selectors';
import { useRecoilState, useRecoilValue } from 'recoil';

import Button from '../Button/Button';
import { CartHeaderStyle, SubTitle, Title } from '../CartHeader/CartHeader.style';
import { CartStyle } from '../Cart/Cart.style';
import CheckBox from '../CheckBox/CheckBox';
import { CheckBoxGroup } from './OrderConfirmCart.style';
import CouponModal from '../Modal/CouponModal/CouponModal';
import ProductItem from '../ProductItem/ProductItem';
import ProductTotalPriceList from '../ProductTotalPriceList/ProductTotalPriceList';
import { ProductListStyle } from '../ProductList/ProductList.style';
import { useState } from 'react';

export default function OrderConfirmCart() {
  const cart = useRecoilValue(checkedCartItems);

  const orderProduct = useRecoilValue(checkedCartItems);
  const cartTotalCount = orderProduct.reduce((acc, cartItem) => acc + cartItem.quantity, 0);
  const [isSpecialZoneCheck, setIsSpecialZoneCheck] = useRecoilState(specialZoneCheckState);
  const couponDiscount = useRecoilValue(couponDiscountAmount);
  const [couponDiscountState, setCouponDiscountState] = useState(useRecoilValue(couponDiscountAmount));

  const [isOpenModal, setIsOpenModal] = useState(false);

  const modalFooterButtons = [
    {
      content: `총 ${couponDiscount.toLocaleString()}원 할인 쿠폰 사용하기`,
      onClick: () => {
        setCouponDiscountState(couponDiscount);
        setIsOpenModal(false);
      },
      className: 'confirmButton',
    },
  ];

  const handleToggleSpecialZoneCheck = () => {
    setIsSpecialZoneCheck(!isSpecialZoneCheck);
    if (isSpecialZoneCheck) setCouponDiscountState(couponDiscount - 3000);
    else setCouponDiscountState(couponDiscount + 3000);
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

          <Button
            text="쿠폰 적용"
            onClick={() => {
              setIsOpenModal(true);
            }}
            className="couponButton"
          />

          <Modal
            position="center"
            size="medium"
            title={{ position: 'left', content: '쿠폰을 선택해 주세요' }}
            isOpen={isOpenModal}
            onClose={() => setIsOpenModal(false)}
            closeButton={{ onClose: () => setIsOpenModal(false) }}
            footerButtons={modalFooterButtons}
          >
            <CouponModal />
          </Modal>

          <CheckBoxGroup>
            배송 정보
            <CheckBox
              text="제주도 및 도서 산간 지역"
              isCheck={isSpecialZoneCheck}
              onClick={handleToggleSpecialZoneCheck}
            />
          </CheckBoxGroup>

          <ProductTotalPriceList couponDiscount={couponDiscountState} />
        </ProductListStyle>
      </CartStyle>
    </div>
  );
}

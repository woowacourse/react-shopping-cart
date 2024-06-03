import 'soosoo-react-modal-component/dist/style.css';
import { Modal } from 'soosoo-react-modal-component';

import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { specialZoneCheckState, couponDiscountAmount, checkedCouponsState } from '../../recoil/atoms/atoms';
import { calculateOrderPrice } from '../../recoil/selectors/selectors';

import Button from '../Button/BaseButton/Button';
import CheckBox from '../CheckBox/CheckBox';
import CouponModal from '../Modal/CouponModal/CouponModal';
import ProductItem from '../ProductItem/ProductItem';
import ProductTotalPriceList from '../ProductTotalPriceList/ProductTotalPriceList';
import { useDiscountCalculator } from '../../hooks/useDiscountCalculator/useDiscountCalculator';
import { Cart } from '../../types/cart';

import * as S from './OrderConfirmCart.style';

export default function OrderConfirmCart({ cartItems }: { cartItems: Cart[] }) {
  const cartTotalCount = cartItems.reduce((acc, cartItem) => acc + cartItem.quantity, 0);
  const [isSpecialZoneCheck, setIsSpecialZoneCheck] = useRecoilState(specialZoneCheckState);

  const setCouponDiscount = useSetRecoilState(couponDiscountAmount);
  const [discount, setDiscount] = useState(0);

  const { totalOrderPrice } = useRecoilValue(calculateOrderPrice);
  const { calculateDiscountAmount } = useDiscountCalculator();
  const checkedCoupons = useRecoilValue(checkedCouponsState);
  const [isOpenModal, setIsOpenModal] = useState(false);

  useEffect(() => {
    calculateDiscount();
  }, [checkedCoupons]);

  const calculateDiscount = () => {
    let newDiscount = 0;
    checkedCoupons.map((coupon) => {
      newDiscount += calculateDiscountAmount(coupon, totalOrderPrice);
    });
    setDiscount(newDiscount);
  };

  const modalFooterButtons = [
    {
      content: `총 ${discount.toLocaleString()}원 할인 쿠폰 사용하기`,
      onClick: () => {
        setCouponDiscount(discount);
        setIsOpenModal(false);
      },
      className: 'confirmButton',
    },
  ];

  const handleToggleSpecialZoneCheck = () => {
    setIsSpecialZoneCheck((prev) => !prev);
  };

  return (
    <div id="orderConfirmPage">
      <S.Cart>
        <S.CartHeader>
          <S.Title>주문 확인</S.Title>
          <S.SubTitle>
            총 {cartItems.length} 종류의 상품 {cartTotalCount}개를 주문합니다.
          </S.SubTitle>
          <S.SubTitle>최종 결제 금액을 확인해 주세요.</S.SubTitle>
        </S.CartHeader>

        <S.ProductList>
          {cartItems.map((cartItem) => {
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

          <S.CheckBoxGroup>
            배송 정보
            <CheckBox
              text="제주도 및 도서 산간 지역"
              isCheck={isSpecialZoneCheck}
              onClick={handleToggleSpecialZoneCheck}
            />
          </S.CheckBoxGroup>

          <ProductTotalPriceList />
        </S.ProductList>
      </S.Cart>
    </div>
  );
}

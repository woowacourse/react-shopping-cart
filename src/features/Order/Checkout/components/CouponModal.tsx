import { Fragment } from 'react';
import styled from '@emotion/styled';
import { Modal, type ModalProps } from '@sebin0580/modal';

import { CartItem } from '@/features/Cart/types/Cart.types';
import { Button } from '@/shared/components/Button';
import { CheckBox } from '@/shared/components/CheckBox';
import { Flex } from '@/shared/components/Flex';
import { Text } from '@/shared/components/Text';

import { useModalSelectCoupon } from '../hooks/useModalSelectCoupon';
import { CouponItem } from '../type/coupon.type';
import { parseHour } from '../utils/parseHour';
import { splitDate } from '../utils/splitDate';

type CouponModalProps = {
  isAutoMode: boolean;
  cartItems: CartItem[];
  coupons: CouponItem[];
  totalPrice: number;
  onApplyCoupon: (id: number) => void;
  specialDeliveryZone: boolean;
} & ModalProps;

export const CouponModal = ({
  isAutoMode,
  coupons,
  onApplyCoupon,
  isOpen,
  totalPrice,
  cartItems,
  title,
  specialDeliveryZone,
  onClose,
}: CouponModalProps) => {
  const { modalCoupons, handleTempToggle, disCountPrice, handleConfirm } = useModalSelectCoupon({
    isAutoMode,
    coupons,
    onApplyCoupon,
    totalPrice,
    isOpen,
    onClose,
    cartItems,
    specialDeliveryZone,
  });
  const allChecked = modalCoupons.filter((item) => item.isChecked).length === 2;

  return (
    <Modal isOpen={isOpen} title={title} onClose={onClose}>
      <Flex
        width="100%"
        direction="column"
        justifyContent="flex-start"
        alignItems="flex-start"
        gap="10px"
        padding="10px 0"
      >
        <Text type="Caption">🥸 쿠폰은 최대 2개까지 사용할 수 있습니다.</Text>
      </Flex>
      <StyledSpacing />
      {modalCoupons?.map((item) => {
        const isGrayedOut = (allChecked && !item.isChecked) || item.isDisabled;
        return (
          <Fragment key={item.id}>
            <Flex
              direction="column"
              justifyContent="flex-start"
              alignItems="flex-start"
              gap="3px"
              width="100%"
              padding="10px 0 20px 0"
            >
              <Flex
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
                gap="10px"
                padding="5px 0"
              >
                <CheckBox
                  checked={item.isChecked}
                  onClick={() => !item.isDisabled && handleTempToggle(item.id)}
                />
                <Text type="Title" color={isGrayedOut ? 'gray' : 'black'}>
                  {item.description}
                </Text>
              </Flex>
              <Text type="Caption" color={isGrayedOut ? 'gray' : 'black'}>
                만료일: {splitDate(item.expirationDate)}
              </Text>
              {item.minimumAmount && (
                <Text type="Caption" color={isGrayedOut ? 'gray' : 'black'}>
                  최소 주문 금액: {item.minimumAmount.toLocaleString()}원
                </Text>
              )}
              {item.availableTime && (
                <Text type="Caption" color={isGrayedOut ? 'gray' : 'black'}>
                  사용 가능 시간: 오전 {parseHour(item.availableTime.start)}시부터{' '}
                  {parseHour(item.availableTime.end)}시까지
                </Text>
              )}
            </Flex>
            <StyledSpacing />
          </Fragment>
        );
      })}
      <Button size="lg" width="100%" onClick={handleConfirm}>
        {`총 ${disCountPrice.toLocaleString()}원 할인 쿠폰 사용하기`}
      </Button>
    </Modal>
  );
};

const StyledSpacing = styled.hr`
  width: 100%;
  height: 1px;
  background-color: rgb(218, 218, 218);
  border: none;
  margin: 0;
`;

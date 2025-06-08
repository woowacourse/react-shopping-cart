import { css } from '@emotion/react';
import { useModal } from '@sebin0580/modal';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/shared/components/Button';
import { CheckBox } from '@/shared/components/CheckBox';
import { Flex } from '@/shared/components/Flex';
import { Header } from '@/shared/components/Header';
import { Text } from '@/shared/components/Text';

import { CartConfirmDetail } from './CheckoutItemDetail';
import { CouponModal } from './CouponModal';
import { PriceConfirmSummary } from './PriceCheckoutSummary';

import Back from '../../../../../public/Back.png';
import { CartListContainer } from '../../../Cart/container/CartListContainer';
import { CartItem } from '../../../Cart/types/Cart.types';
import { useCoupons } from '../hooks/useCoupons';

type CartConfirmProps = {
  cartItems: CartItem[];
};

export const OrderCheckout = ({ cartItems }: CartConfirmProps) => {
  const navigate = useNavigate();
  const { isOpen, handleOpenModal, handleCloseModal } = useModal();
  const {
    coupons,
    applyCoupon,
    totalPrice,
    couponDiscount,
    deliveryFee,
    specialDeliveryZone,
    totalItemLength,
    selectedSpecialDeliveryZone,
  } = useCoupons({
    cartItems,
  });

  const handleNavigateCartPage = () => {
    navigate('/cart');
  };

  const handleNavigateConfirmPage = () => {
    navigate('/order-confirm');
  };

  return (
    <>
      <Header
        left={
          <Button onClick={handleNavigateCartPage} size="xs">
            <img src={Back} width="25px" height="25px" />
          </Button>
        }
      />
      <Flex
        direction="column"
        justifyContent="flex-start"
        alignItems="flex-start"
        gap="10px"
        width="100%"
        padding="20px 20px 10px 20px"
      >
        <Text type="Heading" weight="semibold">
          주문 확인
        </Text>
        <Text type="Caption" weight="regular">
          {`총 ${cartItems.length}종류의 상품 ${totalItemLength}개를 주문합니다.\n최종 결제 금액을 확인해 주세요.`}
        </Text>
      </Flex>
      <>
        <CartListContainer>
          {cartItems?.map((item) => (
            <CartConfirmDetail key={item.id} {...item} />
          ))}
        </CartListContainer>

        <Flex
          direction="column"
          justifyContent="flex-start"
          alignItems="flex-start"
          gap="5px"
          width="100%"
          padding="10px 20px 0 20px"
          margin="10px 0 0 0"
        >
          <Button
            width="100%"
            size="lg"
            variant="outlined"
            color="#888888"
            fontColor="black"
            shape="rounded"
            onClick={handleOpenModal}
          >
            쿠폰 적용
          </Button>
          <Text type="Title">배송정보</Text>
          <Flex
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
            gap="10px"
            width="100%"
          >
            <CheckBox checked={specialDeliveryZone} onClick={selectedSpecialDeliveryZone} />
            <Text type="Caption">제주도 및 도서 산간 지역</Text>
          </Flex>
        </Flex>
        <PriceConfirmSummary
          totalPrice={totalPrice}
          couponDiscount={couponDiscount}
          deliveryFee={deliveryFee}
        />
      </>
      <Button
        width="100%"
        size="xl"
        shape="square"
        css={css`
          position: sticky;
        `}
        onClick={handleNavigateConfirmPage}
      >
        결제확인
      </Button>
      <CouponModal
        coupons={coupons ?? []}
        totalPrice={totalPrice}
        cartItems={cartItems}
        specialDeliveryZone={specialDeliveryZone}
        onApplyCoupon={applyCoupon}
        title="쿠폰을 선택해 주세요"
        isOpen={isOpen}
        onClose={handleCloseModal}
      />
    </>
  );
};

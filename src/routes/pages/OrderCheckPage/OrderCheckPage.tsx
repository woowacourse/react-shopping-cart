import { useState } from 'react';
import { useNavigate } from 'react-router';

import { useCartContext } from '../../../context/CartContext';
import useCouponList from '../../../hooks/useCouponList';

import Header from '../../../components/common/Header/Header';
import HeaderButton from '../../../components/common/Header/HeaderButton';
import CartListTitle from '../../../components/CartListTitle/CartListTitle';
import OrderCartItem from '../../../components/CartItem/OrderCartItem';
import CouponModal from '../../../components/CouponModal/CouponModal';
import DeliverInfo from '../../../components/DeliverInfo/DeliverInfo';
import CartPriceCouponInfo from '../../../components/CartPriceInfo/CartPriceCouponInfo';
import ContainerLayout from '../../../components/common/ContainerLayout/ContainerLayout';
import Button from '../../../components/common/Button/Button';
import Text from '../../../components/common/Text/Text';
import { OrderCheckCartListStyle } from './OrderCheckPage.styles';

import { Back, Default } from '../../../assets';
import { TEXT } from '../../../constants/text';
import { CartItemProps } from '../../../types/cartItem';
import { validateCoupons } from '../../../utils/couponValidate';
import { computeOrderSummary } from '../../../utils/computeOrderSummary';

function OrderCheckPage() {
  const navigate = useNavigate();
  const cart = useCartContext();
  const couponList = useCouponList();
  const validatedCouponList = validateCoupons(
    couponList.data,
    cart.subTotal,
    cart.selectedCartItems
  );

  const [isCouponModalOpen, setIsCouponModalOpen] = useState(false);
  const [isRemotedAreaChecked, setIsRemotedAreaChecked] = useState(false);
  const [checkedCoupons, setCheckedCoupons] = useState<number[] | null>(null);

  const { comboResult, deliveryFee, finalPrice } = computeOrderSummary({
    validatedCouponList,
    checkedCoupons,
    isRemotedAreaChecked,
  });

  const handleCouponModalOpen = () => {
    setCheckedCoupons(comboResult?.combo.map((coupon) => coupon.id));
    setIsCouponModalOpen(true);
  };

  const handleCouponModalClose = () => {
    setIsCouponModalOpen(false);
  };

  const handleRemotedAreaChange = () => {
    setIsRemotedAreaChecked(!isRemotedAreaChecked);
  };

  const handleCouponAccept = (couponIds: number[]) => {
    setCheckedCoupons(couponIds);
    setIsCouponModalOpen(false);
  };

  return (
    <>
      <Header>
        <HeaderButton onClick={() => navigate(-1)}>
          <img src={Back} alt="뒤로가기 버튼" />
        </HeaderButton>
      </Header>
      <ContainerLayout>
        <CartListTitle
          title={TEXT.ORDER_CHECK}
          description={`총 ${cart.typeCount}종류의 상품 ${cart.totalCount}개를 주문합니다.\n최종 결제 금액을 확인해주세요.`}
        />
        <ul css={OrderCheckCartListStyle}>
          {cart.selectedCartItems.map((item: CartItemProps) => (
            <OrderCartItem
              key={item.id}
              quantity={item.quantity}
              product={{
                imageUrl: item.product.imageUrl || Default,
                name: item.product.name,
                price: item.product.price,
              }}
            />
          ))}
        </ul>
        <Button
          color="white"
          variant="secondary"
          onClick={handleCouponModalOpen}
        >
          <Text varient="body">쿠폰 적용</Text>
        </Button>
        <DeliverInfo
          isChecked={isRemotedAreaChecked}
          onCheckboxChange={handleRemotedAreaChange}
        />
        <CartPriceCouponInfo
          subTotal={cart.subTotal}
          deliveryFee={deliveryFee}
          totalDiscount={comboResult?.totalDiscount ?? 0}
          finalPrice={finalPrice}
        />
      </ContainerLayout>
      <Button
        color="black"
        variant="primary"
        onClick={() =>
          navigate('/order-complete', {
            state: {
              finalPrice: finalPrice,
            },
          })
        }
      >
        <Text varient="body">결제하기</Text>
      </Button>
      <CouponModal
        isLoading={couponList.isLoading}
        isOpen={isCouponModalOpen}
        onCloseButtonClick={handleCouponModalClose}
        validatedCouponList={validatedCouponList}
        checkedCoupon={checkedCoupons ?? []}
        onCouponAccept={handleCouponAccept}
      />
    </>
  );
}

export default OrderCheckPage;

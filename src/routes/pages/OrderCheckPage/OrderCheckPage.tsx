import { CartItemProps } from '../../../types/cartItem';
import Header from '../../../components/common/Header/Header';
import HeaderButton from '../../../components/common/Header/HeaderButton';
import { Back } from '../../../assets';
import { useNavigate } from 'react-router';
import { TEXT } from '../../../constants/text';
import CartListTitle from '../../../components/CartListTitle/CartListTitle';
import ContainerLayout from '../../../components/common/ContainerLayout/ContainerLayout';
import OrderCartItem from '../../../components/CartItem/OrderCartItem';
import DeliverInfo from '../../../components/DeliverInfo/DeliverInfo';
import CartPriceCouponInfo from '../../../components/CartPriceInfo/CartPriceCouponInfo';
import { useCartContext } from '../../../context/CartContext';
import { useState } from 'react';
import CouponModal from '../../../components/CouponModal/CouponModal';
import Button from '../../../components/common/Button/Button';
import Text from '../../../components/common/Text/Text';
import { OrderCheckCartListStyle } from './OrderCheckPage.styles';
import useCouponList from '../../../hooks/useCouponList';
import useValidateCoupon from '../../../hooks/useValidateCoupon';
import useCouponCombos from '../../../hooks/useCouponCombos';

function OrderCheckPage() {
  const navigate = useNavigate();

  const cart = useCartContext();
  const { couponList } = useCouponList();

  const { validatedCouponList } = useValidateCoupon(
    couponList,
    cart.subTotal,
    cart.selectedCartItems
  );
  const availableCouponList = validatedCouponList.filter(
    (coupon) => !coupon.isExpired
  );

  const [isCouponModalOpen, setIsCouponModalOpen] = useState(false);
  const [isRemotedAreaChecked, setIsRemotedAreaChecked] = useState(false);
  const [checkedCoupons, setCheckedCoupons] = useState<number[]>([]);

  const result = useCouponCombos(
    checkedCoupons,
    cart.selectedCartItems,
    availableCouponList,
    cart.subTotal,
    cart.deliveryFee
  );
  console.log(result);

  const hasFreeShipping =
    result?.combo?.some((coupon) => coupon.discountType === 'freeShipping') ??
    false;

  const deliveryFee = hasFreeShipping
    ? 0
    : isRemotedAreaChecked
    ? (result?.finalShipping ?? cart.deliveryFee) + 3000
    : result?.finalShipping ?? cart.deliveryFee;

  const finalPrice = result?.PriceWithDiscount + deliveryFee;

  const handleCouponModalOpen = () => {
    setCheckedCoupons(result.combo.map((coupon) => coupon.id));
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
            <OrderCartItem key={item.id} item={item} />
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
          totalDiscount={result?.totalDiscount ?? 0}
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
        isOpen={isCouponModalOpen}
        onClose={handleCouponModalClose}
        validatedCouponList={validatedCouponList}
        checkedCoupon={checkedCoupons}
        onCouponAccept={handleCouponAccept}
      />
    </>
  );
}

export default OrderCheckPage;

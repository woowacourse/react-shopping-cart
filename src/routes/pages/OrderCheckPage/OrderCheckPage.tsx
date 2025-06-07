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
import { useEffect, useState } from 'react';
import CouponModal from '../../../components/CouponModal/CouponModal';
import Button from '../../../components/common/Button/Button';
import Text from '../../../components/common/Text/Text';
import { OrderCheckCartListStyle } from './OrderCheckPage.styles';
import useCouponList from '../../../hooks/useCouponList';
import useValidateCoupon from '../../../hooks/useValidateCoupon';
import useCouponCombos from '../../../hooks/useCouponCombos';
import { Coupon } from '../../../types/coupon';

function OrderCheck() {
  const navigate = useNavigate();

  const cart = useCartContext();
  const { couponList } = useCouponList();

  const selectedCartItems = cart.data?.filter((item: CartItemProps) =>
    cart.selectedItems.includes(item.id)
  );

  const { validatedCouponList } = useValidateCoupon(
    couponList,
    cart.subTotal,
    selectedCartItems
  );
  const availableCouponList = validatedCouponList.filter(
    (coupon) => !coupon.isExpired
  );

  const [isCouponModalOpen, setIsCouponModalOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [checkedCoupons, setCheckedCoupons] = useState<number[]>([]);

  const typeCount = cart.selectedItems.length;
  const totalCount = selectedCartItems.reduce(
    (acc: number, curr: CartItemProps) => {
      return acc + curr?.quantity;
    },
    0
  );

  const result = useCouponCombos(
    checkedCoupons,
    selectedCartItems,
    availableCouponList,
    cart.subTotal,
    cart.deliveryFee
  );
  console.log(result);

  // const hasFreeShipping = result?.combo.some(
  //   (coupon) => coupon.discountType === 'freeShipping'
  // );

  // const deliveryFee = hasFreeShipping
  //   ? 0
  //   : isChecked
  //   ? result.finalShipping + 3000
  //   : result.finalShipping;

  const deliveryFee = isChecked ? cart.deliveryFee + 3000 : cart.deliveryFee;

  const handleCouponButtonClick = () => {
    setCheckedCoupons(result.combo.map((coupon) => coupon.id));
    setIsCouponModalOpen(true);
  };

  const handleCouponModalClose = () => {
    setIsCouponModalOpen(false);
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleCouponCheckboxChange = (id: number) => {
    const newCheckedCoupons = checkedCoupons.includes(id)
      ? checkedCoupons.filter((x) => x !== id)
      : [...checkedCoupons, id];

    if (newCheckedCoupons.length > 2) {
      alert('최대 2개의 쿠폰만 적용할 수 있습니다.');
      return;
    }

    setCheckedCoupons(newCheckedCoupons);
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
          description={`총 ${typeCount}종류의 상품 ${totalCount}개를 주문합니다.\n최종 결제 금액을 확인해주세요.`}
        />
        <ul css={OrderCheckCartListStyle}>
          {selectedCartItems.map((item: CartItemProps) => (
            <OrderCartItem key={item.id} item={item} />
          ))}
        </ul>
        <Button
          color="white"
          variant="secondary"
          onClick={handleCouponButtonClick}
        >
          <Text varient="body">쿠폰 적용</Text>
        </Button>
        <DeliverInfo
          isChecked={isChecked}
          onCheckboxChange={handleCheckboxChange}
        />
        <CartPriceCouponInfo
          subTotal={cart.subTotal}
          deliveryFee={deliveryFee}
          totalBeforeDiscount={cart.totalBeforeDiscount}
        />
      </ContainerLayout>
      <Button color="black" variant="primary" onClick={() => {}}>
        <Text varient="body">결제하기</Text>
      </Button>
      <CouponModal
        isOpen={isCouponModalOpen}
        onClose={handleCouponModalClose}
        validatedCouponList={validatedCouponList}
        checkedCoupon={checkedCoupons}
        onCouponCheckboxChange={handleCouponCheckboxChange}
      />
    </>
  );
}

export default OrderCheck;

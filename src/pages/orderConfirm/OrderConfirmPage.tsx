import Button from '@/components/common/Button';
import { useLocation, useNavigate } from 'react-router-dom';
import CheckoutPageHeader from '../checkout/components/CheckoutPageHeader';
import styles from './orderConfirmPage.module.css';
import OrderSummaryText from '@/components/common/OrderSummaryText';
import { CartItemData } from '@/types';
import CartItem from '../cart/components/CartItem';
import CartItemImageAndInfo from '../cart/components/CartItemImageAndInfo';
import Heading from '@/components/common/Heading';
import CouponModalTrigger from '../../components/modal/CouponModalTrigger';
import ShippingInfoCheckbox from './components/ShippingInfoCheckbox';
import PriceInfo from '@/components/common/PriceInfo';
import Divider from '@/components/common/Divider';
import useGetAllCoupons from '@/hooks/useGetAllCoupons';
import { PAGE_ROUTES } from '@/constants/routes';
import { useShippingManager } from '@/store/custom/useShippingManager';
import { useCouponManager } from '@/store/custom/useCouponManager';

export default function OrderConfirmPage() {
  const location = useLocation();
  const {
    state: { totalCategoryCount, totalOrderQuantity, totalOrderAmount, totalCartItems },
  } = location;
  const { coupons: allCoupons } = useGetAllCoupons();
  const { deliveryFee } = useShippingManager();
  const { totalMaxDiscountPrice } = useCouponManager();
  const totalOrderPrice = totalOrderAmount + deliveryFee - totalMaxDiscountPrice;

  const navigate = useNavigate();

  const handlePaymentButtonClick = () => {
    navigate(PAGE_ROUTES.CHECK_OUT, {
      state: { totalCategoryCount, totalOrderQuantity, totalOrderPrice },
    });
  };

  return (
    <>
      <CheckoutPageHeader />
      <div className={styles.page_wrapper}>
        <div className={styles.summary_info_wrapper}>
          <Heading level={2} className={styles.mainText}>
            주문 확인
          </Heading>
          <div className={styles.infoContainer}>
            <OrderSummaryText
              className={styles.orderInfoContainer}
              totalCategoryCount={totalCategoryCount}
              totalOrderQuantity={totalOrderQuantity}
            />
          </div>
        </div>

        {totalCartItems.map((cartItem: CartItemData) => {
          return (
            <CartItem key={cartItem.id}>
              <CartItemImageAndInfo
                className={styles.itemImageAndInfoContainer}
                imageUrl={cartItem.product.imageUrl}
                name={cartItem.product.name}
                price={cartItem.product.price}
              >
                <span className={styles.quantity_text}>{cartItem.quantity}개</span>
              </CartItemImageAndInfo>
            </CartItem>
          );
        })}
        <CouponModalTrigger allCoupons={allCoupons} />
        <ShippingInfoCheckbox />
        <Divider>
          <PriceInfo titleText="주문 금액" price={totalOrderAmount} />
          <PriceInfo
            titleText="쿠폰 할인 금액"
            price={totalMaxDiscountPrice === 0 ? totalMaxDiscountPrice : -totalMaxDiscountPrice}
          />
          <PriceInfo titleText="배송비" price={deliveryFee} />
        </Divider>
        <Divider>
          <PriceInfo titleText="총 결제 금액" price={totalOrderPrice} />
        </Divider>
      </div>

      <Button variant="footer" onClick={handlePaymentButtonClick}>
        결제하기
      </Button>
    </>
  );
}

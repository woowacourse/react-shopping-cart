import Button from '@/components/common/Button';
import { useLocation } from 'react-router-dom';
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

export default function OrderConfirmPage() {
  const location = useLocation();
  const {
    state: { totalCategoryCount, totalOrderQuantity, totalOrderAmount, totalCartItems },
  } = location;

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
              />
            </CartItem>
          );
        })}
        <CouponModalTrigger />
        <ShippingInfoCheckbox />
        {/* <div className={styles.totalAmount}>
          <h2 className={styles.totalAmountText}>총 결제 금액</h2>
          <h2 className={styles.totalAmountNumber}>{formatKoreanCurrency(totalOrderAmount)}원</h2>
        </div> */}
        <Divider>
          <PriceInfo titleText="주문 금액" price={70000} />
          <PriceInfo titleText="쿠폰 할인 금액" price={-6000} />
          <PriceInfo titleText="배송비" price={6000} />
        </Divider>

        <Divider>
          <PriceInfo titleText="총 결제 금액" price={70000} />
        </Divider>
      </div>

      <Button variant="footer" disabled={true}>
        결제하기
      </Button>
    </>
  );
}

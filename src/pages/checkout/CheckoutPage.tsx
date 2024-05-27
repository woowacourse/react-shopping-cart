import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { isCheckedState, productsState } from '../../store/atoms';
import { totalProductQuantityState } from '../../store/selectors';
import useCleanUpCouponStatusOnUnMount from '../../hooks/coupon/useCleanUpCouponStatusOnUnMount';
import useNavigatePage from '../../hooks/useNavigatePage';
import Button from '../../components/common/Button';
import Header from '../../components/Header/Header';
import CheckoutItem from './components/CheckoutItem';
import CouponModal from './components/CouponModal/CouponModal';
import ShippingFeeCheck from './components/ShippingFeeCheck';
import CheckoutTotals from './components/CheckoutTotals';
import CheckoutTitle from './components/CheckoutTitle';
import ROUTES from '../../constants/routes';
import BackIcon from '../../asset/back.png';
import common from '../../styles/common.module.css';
import styles from './Checkout.module.css';

export default function CheckoutPage() {
  const navigateCartPage = useNavigatePage(ROUTES.CART);
  const navigatePaymentsPage = useNavigatePage(ROUTES.PAYMENTS);

  const { totalCount, totalQuantity } = useRecoilValue(totalProductQuantityState);

  const products = useRecoilValue(productsState);
  const isCheckedMap = useRecoilValue(isCheckedState);
  const checkoutProducts = products.filter((product) => isCheckedMap[product.id] === true);

  const [modalOpen, setModalOpen] = useState(false);

  const handleButtonClick = () => {
    setModalOpen(!modalOpen);
  };

  useCleanUpCouponStatusOnUnMount();

  return (
    <>
      <Header>
        <Button variant="image" onClick={navigateCartPage}>
          <img src={BackIcon} width={32} height={32} alt="back-icon" />
        </Button>
      </Header>
      <div className={styles.bodyContainer}>
        <CheckoutTitle totalCount={totalCount} totalQuantity={totalQuantity} />
        <div>
          {checkoutProducts.map((cartItem) => {
            return <CheckoutItem key={`checkout-${cartItem.id}`} cartItem={cartItem} />;
          })}
        </div>
        <button
          className={`${styles.checkoutModalButton} ${common.subtitleText}`}
          onClick={handleButtonClick}
        >
          쿠폰 적용
        </button>
        <ShippingFeeCheck />
        <CheckoutTotals />
      </div>

      <Button variant="footer" onClick={navigatePaymentsPage}>
        결제하기
      </Button>
      <CouponModal isOpen={modalOpen} handleToggle={handleButtonClick} />
    </>
  );
}

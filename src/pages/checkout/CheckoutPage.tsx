import { useRecoilValue } from 'recoil';
import { productsIdState } from '../../store/selectors';
import { addOrders } from '../../api';
import useCleanUpCouponStatusOnUnMount from '../../hooks/coupon/useCleanUpCouponStatusOnUnMount';
import useNavigatePage from '../../hooks/useNavigatePage';
import useModalControl from '../../hooks/useModalControl';
import Button from '../../components/common/Button';
import Header from '../../components/Header/Header';
import CouponModal from './components/CouponModal/CouponModal';
import ShippingFeeCheck from './components/ShippingFeeCheck';
import CheckoutTotals from './components/CheckoutTotals';
import CheckoutTitle from './components/CheckoutTitle';
import ROUTES from '../../constants/routes';
import CheckoutList from './components/CheckoutList';
import BackIcon from '../../asset/back.png';
import common from '../../styles/common.module.css';
import styles from './Checkout.module.css';

export default function CheckoutPage() {
  const navigateCartPage = useNavigatePage(ROUTES.CART);
  const navigatePaymentsPage = useNavigatePage(ROUTES.PAYMENTS);
  const productIds = useRecoilValue(productsIdState);
  const { isModalOpen, handleModalOpen } = useModalControl();

  useCleanUpCouponStatusOnUnMount();

  const handlePaymentsButtonClick = async () => {
    try {
      await addOrders(productIds);
      navigatePaymentsPage();
    } catch (error) {
      alert(error);
    }
  };

  return (
    <>
      <Header>
        <Button variant="image" onClick={navigateCartPage}>
          <img src={BackIcon} width={32} height={32} alt="back-icon" />
        </Button>
      </Header>
      <div className={styles.bodyContainer}>
        <CheckoutTitle />
        <CheckoutList />
        <button
          className={`${styles.checkoutModalButton} ${common.subtitleText}`}
          onClick={handleModalOpen}
        >
          쿠폰 적용
        </button>
        <ShippingFeeCheck />
        <CheckoutTotals />
      </div>

      <Button variant="footer" onClick={handlePaymentsButtonClick}>
        결제하기
      </Button>
      <CouponModal isOpen={isModalOpen} handleToggle={handleModalOpen} />
    </>
  );
}

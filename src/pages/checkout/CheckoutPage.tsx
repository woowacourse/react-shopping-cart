import { useNavigate } from 'react-router-dom';
import ROUTES from '../../constants/routes';
import Button from '../../components/common/Button';
import Header from '../../components/Header/Header';
import BackIcon from '../../asset/back.png';
import styles from './Checkout.module.css';
import common from '../../styles/common.module.css';
import { useRecoilValue } from 'recoil';
import { totalProductQuantityState } from '../../store/selectors';
import { isCheckedState, productsState } from '../../store/atoms';
import CheckoutItem from './components/CheckoutItem';

export default function CheckoutPage() {
  const navigate = useNavigate();
  const handleBackButtonClick = () => {
    navigate(ROUTES.CART);
  };
  const { totalCount, totalQuantity } = useRecoilValue(totalProductQuantityState);

  const products = useRecoilValue(productsState);
  const isCheckedMap = useRecoilValue(isCheckedState);
  const checkoutProducts = products.filter((product) => isCheckedMap[product.id] === true);

  return (
    <>
      <Header>
        <Button variant="image" onClick={handleBackButtonClick}>
          <img src={BackIcon} width={32} height={32} alt="back-icon" />
        </Button>
      </Header>
      <div className={styles.bodyWrapper}>
        {/* CheckoutPage Title */}
        <div className={styles.titleWrapper}>
          <h1 className={common.titleText}>주문 확인</h1>
          <div>
            <div className={common.captionText}>
              총 {totalCount}종류의 상품 {totalQuantity}개를 주문합니다.
            </div>
            <div className={common.captionText}>최종 결제 금액을 확인해 주세요.</div>
          </div>
        </div>
        <div>
          {checkoutProducts.map((cartItem) => {
            return <CheckoutItem key={`checkout-${cartItem.id}`} cartItem={cartItem} />;
          })}
        </div>
      </div>

      {/* 다음 미션에서 기능 추가 예정 */}
      <Button variant="footer" disabled={true}>
        결제하기
      </Button>
    </>
  );
}

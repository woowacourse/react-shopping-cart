import { useRecoilState } from 'recoil';
import { additionalShippingFeeStatusState } from '../../../store/orderStore';
import CheckBox from '../../../components/common/CheckBox/CheckBox';
import common from '../../../styles/common.module.css';
import styles from '../Checkout.module.css';

export default function ShippingFeeCheck() {
  const [additionalShippingFeeStatus, setAdditionalShippingFeeStatus] = useRecoilState(
    additionalShippingFeeStatusState,
  );

  const handleToggleShippingFeeSelect = () => {
    setAdditionalShippingFeeStatus(!additionalShippingFeeStatus);
  };

  return (
    <div className={styles.shippingFeeCheckContainer}>
      <h1 className={common.subtitleText}>배송 정보</h1>
      <div className={styles.checkboxContainer}>
        <CheckBox
          id="shippingFeeCheckbox"
          checked={additionalShippingFeeStatus}
          onChange={handleToggleShippingFeeSelect}
        />
        <span className={common.labelText}>제주도 및 도서 산간 지역</span>
      </div>
    </div>
  );
}

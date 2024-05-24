import { useRecoilState } from 'recoil';
import { shippingFeeState } from '../../../store/atoms';
import CheckBox from '../../../components/common/CheckBox/CheckBox';
import common from '../../../styles/common.module.css';
import styles from '../Checkout.module.css';

export default function ShippingFeeCheck() {
  const [shippingFee, setShippingFee] = useRecoilState(shippingFeeState);
  const { hasAdditionalFee } = shippingFee;

  const handleToggleShippingFeeSelect = () => {
    const newShippingFee = { ...shippingFee, hasAdditionalFee: !hasAdditionalFee };

    setShippingFee(newShippingFee);
  };

  return (
    <div className={styles.shippingFeeCheckContainer}>
      <h1 className={common.subtitleText}>배송 정보</h1>
      <div className={styles.checkboxContainer}>
        <CheckBox
          id="shippingFeeCheckbox"
          checked={hasAdditionalFee}
          onChange={handleToggleShippingFeeSelect}
        />
        <span className={common.labelText}>제주도 및 도서 산간 지역</span>
      </div>
    </div>
  );
}

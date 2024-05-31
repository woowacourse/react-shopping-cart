import { useRecoilState } from 'recoil';
import { additionalShippingFeeStatusState } from '../../../store/orderStore';
import CheckBox from '../../../components/common/CheckBox/CheckBox';
import Text from '../../../components/common/Text/Text';
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
      <Text.Subtitle>배송 정보</Text.Subtitle>
      <div className={styles.checkboxContainer}>
        <CheckBox
          id="shippingFeeCheckbox"
          checked={additionalShippingFeeStatus}
          onChange={handleToggleShippingFeeSelect}
        />
        <Text.Label>제주도 및 도서 산간 지역</Text.Label>
      </div>
    </div>
  );
}

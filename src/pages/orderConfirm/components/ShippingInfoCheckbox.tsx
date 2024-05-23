import CheckBox from '@/components/common/CheckBox';
import styles from './shippingInfoCheckbox.module.css';
import { useRecoilState } from 'recoil';
import { isFarShippingLocationSelector } from '@/store/selectors';

export default function ShippingInfoCheckbox() {
  const [isFarShippingLocation, setIsFarShippingLocation] = useRecoilState(
    isFarShippingLocationSelector,
  );

  const handleFarShippingLocation = () => {
    setIsFarShippingLocation((prev) => ({
      ...prev,
      isChecked: !prev.isChecked,
    }));
  };

  if (!isFarShippingLocation.isAvailable) {
    return null;
  }

  return (
    <div className={styles.container}>
      <p className={styles.shipping_title}>배송 정보</p>
      <div className={styles.checkbox_container}>
        <CheckBox
          id="isFarShippingLocation"
          onChange={handleFarShippingLocation}
          checked={isFarShippingLocation.isChecked}
        />
        <span className={styles.text}>제주도 및 도서 산간 지역</span>
      </div>
    </div>
  );
}

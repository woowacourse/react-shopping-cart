import useToggleAllChecked from '@/hooks/useToggleAllChecked';
import { isAllCheckedCartItemsSelector } from '@/store/selectors';
import { useRecoilValue } from 'recoil';
import styles from '../Cart.module.css';

export default function AllSelectCheckBox() {
  const { handleToggleAll } = useToggleAllChecked();
  const isAllChecked = useRecoilValue(isAllCheckedCartItemsSelector);

  return (
    <div className={styles.allCheckContainer}>
      <input
        type="checkbox"
        id={'checkAll'}
        className={styles.customCheckbox}
        checked={isAllChecked}
        onChange={handleToggleAll}
      ></input>
      <label htmlFor={'checkAll'} className={styles.customCheckboxLabel}></label>
      <div className={styles.allCheckText}>전체 선택</div>
    </div>
  );
}

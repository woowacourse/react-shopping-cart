import useToggleAllChecked from '@/hooks/useToggleAllChecked';
import styles from '../Cart.module.css';
import CheckBox from '@/components/common/CheckBox';

export default function AllSelectCheckBox() {
  const { isAllChecked, handleToggleAll } = useToggleAllChecked();

  return (
    <div className={styles.allCheckContainer}>
      <CheckBox id={'checkAll'} checked={isAllChecked} onChange={handleToggleAll} />
      <div className={styles.allCheckText}>전체 선택</div>
    </div>
  );
}

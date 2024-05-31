import Button from '@/components/common/Button';
import CheckBox from '@/components/common/CheckBox';
import useDeleteProduct from '@/hooks/useDeleteProduct';
import useToggleIndividualChecked from '@/hooks/useToggleIndividualChecked';
import styles from './checkAndDelete.module.css';

type Props = {
  id: number;
};

export default function CheckAndDelete({ id }: Props) {
  const { handleToggleSelect, isChecked } = useToggleIndividualChecked(id);
  const { handleDeleteButton } = useDeleteProduct(id);

  return (
    <div className={styles.cartItemInputButtonContainer}>
      <CheckBox id={`item-${id}`} onChange={handleToggleSelect} checked={isChecked} />
      <Button className={styles.deleteButton} onClick={handleDeleteButton}>
        삭제
      </Button>
    </div>
  );
}

import useToggleIndividualChecked from '@/hooks/useToggleIndividualChecked';
import styles from '../Cart.module.css';

type Props = {
  id: number;
};

export default function CartItemCheckBox({ id }: Props) {
  const { handleToggleSelect, isChecked } = useToggleIndividualChecked(id);

  return (
    <>
      <input
        type="checkbox"
        id={`item-${id}`}
        checked={isChecked}
        className={styles.customCheckbox}
        onChange={handleToggleSelect}
      ></input>
      <label htmlFor={`item-${id}`} className={styles.customCheckboxLabel}></label>
    </>
  );
}

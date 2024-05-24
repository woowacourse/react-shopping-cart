import { CartItemType } from '../../../types';
import CartItem from './CartItem';
import useToggleAllChecked from '../../../hooks/useToggleAllChecked';
import styles from '../Cart.module.css';
import common from '../../../styles/common.module.css';
import { useRecoilValue } from 'recoil';
import { isCheckedState } from '../../../store/atoms';
import CheckBox from '../../../components/common/CheckBox/CheckBox';

interface Props {
  products: CartItemType[];
}

export default function CartList({ products }: Props) {
  const { handleToggleAll, allChecked, setAllChecked } = useToggleAllChecked();
  const isCheckedMap = useRecoilValue(isCheckedState);

  return (
    <>
      <div className={styles.allCheckContainer}>
        <CheckBox id="checkAll" checked={allChecked} onChange={handleToggleAll} />
        <div className={`${styles.allCheckText} ${common.captionText}`}>전체 선택</div>
      </div>

      <ul>
        {products.map((product) => {
          return (
            <CartItem
              key={product.id}
              id={product.id}
              quantity={product.quantity}
              name={product.product.name}
              price={product.product.price}
              category={product.product.category}
              imageUrl={product.product.imageUrl}
              isChecked={isCheckedMap[product.id]}
              setAllChecked={setAllChecked}
            />
          );
        })}
      </ul>
    </>
  );
}

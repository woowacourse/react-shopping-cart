import { useRecoilValue } from 'recoil';
import { isCheckedState } from '../../../store/productStore';
import { CartItemType } from '../../../types';
import useToggleAllChecked from '../../../hooks/useToggleAllChecked';
import CartItem from './CartItem';
import CheckBox from '../../../components/common/CheckBox/CheckBox';
import common from '../../../styles/common.module.css';
import styles from '../Cart.module.css';

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

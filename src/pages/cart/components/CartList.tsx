import { useRecoilValue } from 'recoil';
import { isCheckedState } from '@store/productStore';
import useToggleAllChecked from '@hooks/useToggleAllChecked';
import CheckBox from '@components/common/CheckBox/CheckBox';
import Text from '@components/common/Text/Text';
import CartItem from './CartItem';
import { CartItemType } from '../../../types';
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
        <div className={`${styles.allCheckText}`}>
          <Text.Caption>전체 선택</Text.Caption>
        </div>
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

import { useRecoilState } from 'recoil';

import { TrashCan } from '../../assets';
import { useFetch } from '../../hooks/useFetch';
import { cartListState } from '../../store/cart';
import { ProductItemType } from '../../types';
import { priceFormatter } from '../../utils/formatter';
import Checkbox from '../Checkbox/Checkbox';
import StepperButton from '../StepperButton/StepperButton';
import styles from './style.module.css';

interface CartItemProps {
  quantity: number;
  product: ProductItemType;
  itemId: number;
  isChecked: boolean;
  checkHandler: (id: number) => void;
  removeItem: (id: number) => void;
}

const CartItem = ({
  quantity,
  product,
  itemId,
  isChecked,
  checkHandler,
  removeItem,
}: CartItemProps) => {
  const [, setCartList] = useRecoilState(cartListState);
  const { fetchApi } = useFetch<ProductItemType[]>(setCartList);
  const updateCartItemQuantityDecrease = (id: number) => {
    fetchApi.post('/update-cart-item-quantity-decrease', { itemId: id });
  };

  const updateCartItemQuantityIncrease = (id: number) => {
    fetchApi.post('/update-cart-item-quantity-increase', { itemId: id });
  };

  return (
    <>
      <div className={styles.cartItem}>
        <div className={styles.deleteCheckerBox}>
          <Checkbox
            checked={isChecked}
            clickEvent={() => {
              checkHandler(itemId);
            }}
          />
        </div>
        <img className={styles.cartImage} src={product.imageUrl} alt="고기임" />
        <div className={styles.productName}>
          <p>{product.name}</p>
        </div>
        <div className={styles.itemCountDatas}>
          <TrashCan
            width={16}
            height={16}
            onClick={() => {
              removeItem(itemId);
            }}
          />
          <StepperButton
            count={quantity}
            itemId={itemId}
            increaseCount={(itemId) => {
              updateCartItemQuantityIncrease(itemId);
            }}
            decreaseCount={(itemId) => {
              updateCartItemQuantityDecrease(itemId);
            }}
          />
          <div className={styles.resultPrice}>{priceFormatter(product.price * quantity)}원</div>
        </div>
      </div>
    </>
  );
};

export default CartItem;

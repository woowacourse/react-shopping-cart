import CartItem from './CartItem';
import AllSelectCheckBox from './AllSelectCheckBox';
import CheckAndDelete from './CheckAndDelete';
import CartItemImageAndInfo from './CartItemImageAndInfo';
import CountButton from './CountButton';
import styles from './cartItemImageAndInfo.module.css';
import Divider from '@/components/common/Divider';
import { useCartManager } from '@/store/custom/useCartManager';
import { CartItemData } from '@/types';

export default function CartList() {
  const { totalCartItems } = useCartManager();

  return (
    <>
      <AllSelectCheckBox />
      <ul>
        {totalCartItems.map((cartItem: CartItemData) => {
          return (
            <CartItem key={cartItem.id}>
              <Divider>
                <CheckAndDelete id={cartItem.id} />
                <CartItemImageAndInfo
                  className={styles.itemImageAndInfoContainer}
                  imageUrl={cartItem.product.imageUrl}
                  name={cartItem.product.name}
                  price={cartItem.product.price}
                >
                  <CountButton id={cartItem.id} />
                </CartItemImageAndInfo>
              </Divider>
            </CartItem>
          );
        })}
      </ul>
    </>
  );
}

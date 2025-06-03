import * as styles from './CartItem.style';
import Stepper from './Stepper';
import { RemoveButton } from './RemoveButton';
import CheckBox from '../common/CheckBox';
import { CartItemType } from '../../types/cartItem';
import patchCartItem from '../../api/patchCartItem';
import { useApiContext } from '../../contexts/ApiContext';
import getCartItems from '../../api/getCartItem';
import { deleteCartItem } from '../../api/deleteCartItem';

interface CartItemProps {
  item: CartItemType;
  handleCheckBoxChange: () => void;
  checked: boolean;
  handleDeleteCart: () => void;
}

export default function CartItem({ item, handleCheckBoxChange, checked, handleDeleteCart }: CartItemProps) {
  const { id: cartItemId, product, quantity: cartQuantity } = item;
  const { name, price, imageUrl } = product;

  const { fetcher: refetchCart } = useApiContext({ fetchFn: getCartItems, key: 'getCartItems' });

  const handleMinus = async () => {
    await patchCartItem(cartItemId, cartQuantity - 1);
    await refetchCart();
  };

  const handlePlus = async () => {
    await patchCartItem(cartItemId, cartQuantity + 1);
    await refetchCart();
  };

  const handleDeleteCartItem = async () => {
    await deleteCartItem(cartItemId);
    handleDeleteCart();
    await refetchCart();
  };

  return (
    <div key={cartItemId} css={styles.cartItemFrameCss}>
      <div css={styles.cartItemHeaderCss}>
        <CheckBox onChange={handleCheckBoxChange} checked={checked} />
        <RemoveButton onClick={handleDeleteCartItem} />
      </div>
      <div css={styles.cartItemInfoCss}>
        <img
          css={styles.cartItemImgCss}
          src={imageUrl || './assets/default.png'}
          alt={name}
          onError={(e) => {
            e.currentTarget.src = './assets/default.png';
          }}
        />
        <div>
          <p>{name}</p>
          <p css={styles.cartItemPriceCss}>{(price * cartQuantity).toLocaleString()}원</p>
          <Stepper value={cartQuantity} onDecrement={handleMinus} onIncrement={handlePlus} />
        </div>
      </div>
    </div>
  );
}

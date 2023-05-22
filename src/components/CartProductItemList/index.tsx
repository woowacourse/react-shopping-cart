/* eslint-disable react-hooks/exhaustive-deps */
import { useRecoilState } from 'recoil';
import useCart from '../../hooks/useCart';
import { $CheckedCartIdList } from '../../recoil/atom';
import CartProductItem from '../CartProductItem';
import styles from './index.module.scss';
import type { CartItem } from '../../types';

function CartProductItemList() {
  const { cartItemStateList, cartIdList, deleteCartItem, mutateQuantity } = useCart();
  const [checkedCartIdList, setCheckedCartIdList] = useRecoilState($CheckedCartIdList);

  const checkAllCartItem: React.ChangeEventHandler<HTMLInputElement> = ({ target: { checked } }) => {
    if (checked && cartItemStateList) {
      return setCheckedCartIdList(cartItemStateList.map(item => item.id));
    }
    return setCheckedCartIdList([]);
  };

  const checkCartItem =
    (id: number) =>
    ({ target: { checked } }: React.ChangeEvent<HTMLInputElement>) => {
      if (!checked) {
        return setCheckedCartIdList(prev => prev.filter(cartId => cartId !== id));
      }
      return setCheckedCartIdList(prev => [...prev, id]);
    };

  const deleteCheckedCartItem = () => {
    checkedCartIdList.forEach(async id => {
      await deleteCartItem(id);
    });
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>배송 상품 {`(${cartIdList.length}개)`}</h3>
      <section className={styles['cart-container']}>
        {cartItemStateList?.map((item: CartItem) => (
          <CartProductItem
            key={item.id}
            cartItem={item}
            toggleCheck={checkCartItem(item.id)}
            checked={checkedCartIdList.includes(item.id)}
            mutateQuantity={mutateQuantity}
            deleteCartItem={deleteCartItem}
          />
        ))}
      </section>
      <div className={styles['check-menu']}>
        <input
          type="checkbox"
          className={styles['check-box']}
          onChange={checkAllCartItem}
          checked={cartIdList.length === checkedCartIdList.length}
        />
        <div>전체 선택 ({`${checkedCartIdList.length}/${cartIdList.length}`})</div>
        <button type="button" onClick={deleteCheckedCartItem}>
          선택 삭제
        </button>
      </div>
    </div>
  );
}

export default CartProductItemList;

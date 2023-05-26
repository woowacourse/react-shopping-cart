import styles from './index.module.css';
import { cartItems } from '../../data/mockData';
import { CartItem } from '../../types';
import CartProduct from '../CartProduct';
import { useRecoilState } from 'recoil';
import { $Cart, $CheckedCartState } from '../../recoil/atom';
import { SyntheticEvent, createRef, useRef } from 'react';
import { deleteCartItem } from '../../api/cartApi';
import { toast } from 'react-toastify';
import errorMessage from '../../constant/errorMessage';

const CartProductList = () => {
  const [cart, setCart] = useRecoilState($Cart);
  const [CheckedCartData, setCheckedCartData] = useRecoilState($CheckedCartState);
  const formRef = useRef<HTMLFormElement>(null);
  const checkboxRefs = cart.map(() => createRef<HTMLInputElement>());

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
  };

  const handleCheckboxChanged = (event: SyntheticEvent) => {
    if (!formRef.current) return;
    const targetInput = event.target as HTMLInputElement;
    const data = new FormData(formRef.current);
    const count = data.getAll('select-item').length;

    if (targetInput.classList.contains('select-all')) {
      // select-all 선택시
      const checked = targetInput.checked;
      checkboxRefs.forEach(inputElement => {
        inputElement.current!.checked = checked;
      });
    } else {
      // 개별아이템 선택시
      const checked = count === cart.length;
      formRef.current.querySelector<HTMLInputElement>('.select-all')!.checked = checked;
    }

    const checkedItems = checkboxRefs.reduce<CartItem[]>((res, ref, i) => {
      if (ref.current!.checked) res.push(cartItems[i]);
      return res;
    }, []);
    setCheckedCartData(checkedItems);
  };

  const handleDeleteButton = async () => {
    try {
      await Promise.all(
        CheckedCartData.map(async product => {
          await deleteCartItem(product.product.id);
          setCart(prev => prev.filter(item => item !== product.product.id));
        })
      );
    } catch (e) {
      toast.error(errorMessage.delete);
    }
  };

  return (
    <form className={styles.container} ref={formRef} onChange={handleCheckboxChanged} onSubmit={handleSubmit}>
      <header className={styles['cart-product-list-title']}>
        <h1>든든배송 상품 ({cart.length}개)</h1>
      </header>
      <main className={styles['cart-product-list-container']}>
        {cartItems.map((item: CartItem, i: number) => (
          <CartProduct key={item.id} cartItem={item} ref={checkboxRefs[i]} />
        ))}
      </main>
      <div className={styles['choice-action-container']}>
        <input className="select-all" name="select-all" type="checkbox" />
        <span>
          전체선택 ({CheckedCartData.length}/{cart.length})
        </span>
        <button onClick={handleDeleteButton}>선택삭제</button>
      </div>
    </form>
  );
};

export default CartProductList;

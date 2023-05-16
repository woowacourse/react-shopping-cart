/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import CartProductItem from '../CartProductItem';
import useGetQuery from '../../hooks/useGetQuery';
import { $ToastMessageList } from '../../recoil/atom';
import styles from './index.module.scss';
import type { CartItem } from '../../types';

function CartProductItemList() {
  const { data: cartProductsData, error } = useGetQuery<CartItem[]>('./cart-items');
  const setMessageList = useSetRecoilState($ToastMessageList);

  useEffect(() => {
    if (error) {
      setMessageList(prev => [...prev, '장바구니 리스트를 불러오는 과정에서 에러가 발생했습니다.']);
    }
  }, [error]);

  return (
    <section className={styles.container}>
      {cartProductsData?.map((item: CartItem) => (
        <CartProductItem key={item.id} cartItem={item} />
      ))}
    </section>
  );
}

export default CartProductItemList;

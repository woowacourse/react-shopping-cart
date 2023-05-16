/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import CartProductItem from '../CartProductItem';
import useGetQuery from '../../hooks/useGetQuery';
import { $CartIdList, $ToastMessageList } from '../../recoil/atom';
import styles from './index.module.scss';
import type { CartItem } from '../../types';
import useMutationQuery from '../../hooks/useMutationQuery';

function CartProductItemList() {
  const { data: cartProductsData, error, refreshQuery } = useGetQuery<CartItem[]>('./cart-items');
  const { mutateQuery } = useMutationQuery<Record<string, number>, CartItem>('./cart-items');
  const [cartIdList, setCartIdList] = useRecoilState($CartIdList);
  const setMessageList = useSetRecoilState($ToastMessageList);

  useEffect(() => {
    if (error) {
      setMessageList(prev => [...prev, '장바구니 리스트를 불러오는 과정에서 에러가 발생했습니다.']);
    }
  }, [error]);

  const checkAllCartItem: React.ChangeEventHandler<HTMLInputElement> = ({ target: { checked } }) => {
    if (checked && cartProductsData) {
      return setCartIdList(cartProductsData.map(({ product }) => product.id));
    }
    return setCartIdList([]);
  };

  const checkCartItem =
    (id: number) =>
    ({ target: { checked } }: React.ChangeEvent<HTMLInputElement>) => {
      if (!checked) {
        return setCartIdList(prev => prev.filter(cartId => cartId !== id));
      }
      return setCartIdList(prev => [...prev, id]);
    };

  const deleteCartItem = (id: number) => async () => {
    await mutateQuery('DELETE', undefined, String(id));
    refreshQuery();

    setCartIdList(prev => prev.filter(cartId => cartId !== id));
  };

  const deleteCheckedCartItem = () => {
    cartIdList.forEach(async id => {
      await mutateQuery('DELETE', undefined, String(id));
    });
    refreshQuery();
    setCartIdList([]);
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>배송 상품 {`(${cartIdList.length}개)`}</h3>
      <section className={styles['cart-container']}>
        {cartProductsData?.map((item: CartItem) => (
          <CartProductItem
            key={item.id}
            cartItem={item}
            deleteCart={deleteCartItem(item.product.id)}
            toggleCheck={checkCartItem(item.product.id)}
            checked={cartIdList.includes(item.product.id)}
          />
        ))}
      </section>
      <div className={styles['check-menu']}>
        <input
          type="checkbox"
          className={styles['check-box']}
          onChange={checkAllCartItem}
          checked={cartIdList.length === cartProductsData?.length}
        />
        <div>전체 선택 ({`${cartIdList.length}/${cartProductsData?.length}`})</div>
        <button onClick={deleteCheckedCartItem}>선택 삭제</button>
      </div>
    </div>
  );
}

export default CartProductItemList;

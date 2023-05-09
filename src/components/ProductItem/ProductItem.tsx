import { useRecoilState } from 'recoil';

import CartIcon from '../../assets/cart-icon.svg';
import { cartListState } from '../../pages/ProductListPage';
import { ProductItemData } from '../../types';
import styles from './style.module.css';

interface ProductItemProps {
  information: ProductItemData;
}

const ProductItem = ({ information }: ProductItemProps) => {
  const [cartList, setCartList] = useRecoilState(cartListState);

  const handleCartListAdd = () => {
    // product id를 가지는 카트 아이템 있는지 확인하기 -> 그다음에 올리기
    setCartList([...cartList, { id: 1, quantity: 1, product: information }]);
  };

  return (
    <div className={styles.container}>
      <img src={information.imageUrl} alt={information.name} className={styles.image} />
      <div className={styles.informationContainer}>
        <div>
          <h4 className={styles.name}>{information.name}</h4>
          <h4 className={styles.price}>{information.price}원</h4>
        </div>
        <button type="button" onClick={handleCartListAdd}>
          <img src={CartIcon} alt="cart icon" />
        </button>
      </div>
    </div>
  );
};

export default ProductItem;

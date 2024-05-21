import * as S from './CartItemList.style';

import CartItem from '../CartItem/CartItem';

import { useCartItemSelectedIdList } from '../../recoil/cartItem/useCartItemSelectedIdList';
import useCartItemList from '../../recoil/cartItemList/useCartItemList';
import CheckboxWithLabel from '../CheckboxWithLabel/CheckboxWithLabel';

const CartItemList = () => {
  const { cartItemList } = useCartItemList();
  const { isSelectedAll, unselectAll, selectAll } = useCartItemSelectedIdList();

  return (
    <S.CartItemList>
      <CheckboxWithLabel
        isChecked={isSelectedAll}
        onClick={isSelectedAll ? unselectAll : selectAll}
        labelText="전체선택"
      />
      {cartItemList.map(({ product, id }: CartItem) => {
        return <CartItem key={id} product={product} id={id} />;
      })}
    </S.CartItemList>
  );
};

export default CartItemList;

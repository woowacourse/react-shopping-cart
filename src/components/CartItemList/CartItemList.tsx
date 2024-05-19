import * as S from './CartItemList.style';

import CartItem from '../CartItem/CartItem';

import Checkbox from '../common/Checkbox/Checkbox';
import Text from '../common/Text/Text';

import { useCartItemSelectedIdList } from '../../recoil/cartItem/useCartItemSelectedIdList';
import useCartItemList from '../../recoil/cartItemList/useCartItemList';


const CartItemList = () => {
  const { cartItemList } = useCartItemList();
  const { isSelectedAll, unselectAll, selectAll } = useCartItemSelectedIdList();

  return (
    <S.CartItemList>
      <S.SelectAllContainer>
        <Checkbox state={isSelectedAll} handleClick={isSelectedAll ? unselectAll : selectAll} />
        <Text size="s" weight="m">
          전체선택
        </Text>
      </S.SelectAllContainer>
      {cartItemList.map(({ product, id }: CartItem) => {
        return <CartItem key={id} product={product} id={id} />;
      })}
    </S.CartItemList>
  );
};

export default CartItemList;

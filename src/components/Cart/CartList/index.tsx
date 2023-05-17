import { CartItem } from 'src/types';
import Item from '../CartItem';
import * as S from './CartList.styles';

interface CartListProps {
  cartList: CartItem[];
}

const CartList = ({ cartList }: CartListProps) => {
  // 카트 리스트를 받아서 쓰지만 사실은 전역 상태 관리로 관리가 되어야 하는 부분임.

  return (
    <S.CartListWrapper>
      <S.CartListHeader>
        <S.SelectLabel htmlFor="whole-select">
          <S.SelectInput id="whole-select" type="checkbox" />
          <S.SelectText>{`전체 선택 (n/n개)`}</S.SelectText>
        </S.SelectLabel>
        <span>|</span>
        <button>선택 삭제</button>
      </S.CartListHeader>
      <ul>
        {cartList.map((item) => (
          <Item item={item} />
        ))}
      </ul>
    </S.CartListWrapper>
  );
};

export default CartList;

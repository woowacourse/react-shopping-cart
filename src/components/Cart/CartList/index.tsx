import { CartItem } from 'src/types';
import Item from '../CartItem';
import * as S from './CartList.styles';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
  countCartListSelector,
  countSelectedCartItemsSelector,
  deleteCartItemSelector,
  wholeCartITemToggleSelector,
} from 'src/recoil/cartList';

interface CartListProps {
  cartList: CartItem[];
}

const CartList = ({ cartList }: CartListProps) => {
  const wholeCartItemsCount = useRecoilValue(countCartListSelector);
  const selectedCartItems = useRecoilValue(countSelectedCartItemsSelector);

  const setDeleteCartList = useSetRecoilState(deleteCartItemSelector);

  const [wholeSelected, setWholeSelected] = useRecoilState(
    wholeCartITemToggleSelector
  );

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const { checked } = event.currentTarget;
    setWholeSelected(checked);
  };

  const onClickDeleteHandler: React.MouseEventHandler<
    HTMLButtonElement
  > = () => {
    const selectedIds = selectedCartItems.map((item) => item.id);
    setDeleteCartList([...selectedIds]);
  };

  return (
    <S.CartListWrapper>
      <S.CartListHeader>
        <S.SelectLabel htmlFor="whole-select">
          <S.SelectInput
            id="whole-select"
            type="checkbox"
            checked={wholeSelected}
            onChange={onChange}
          />
          <S.SelectText>{`전체 선택 (${selectedCartItems.length}/${wholeCartItemsCount}개)`}</S.SelectText>
        </S.SelectLabel>
        <span>|</span>
        <button onClick={onClickDeleteHandler}>선택 삭제</button>
      </S.CartListHeader>
      <ul>
        {cartList.map((item) => (
          <Item key={item.id} item={item} />
        ))}
      </ul>
    </S.CartListWrapper>
  );
};

export default CartList;

import SelectBox from '../../../common/selectBox/SelectBox';
import CartItem from '../cartItem/CartItem';
import * as S from './CartList.styles';

function CartList() {
  return (
    <S.Container>
      <S.AllSelectBox>
        <SelectBox id="allSelect" isSelected={true} />
        <S.AllSelectText htmlFor="allSelect">전체선택</S.AllSelectText>
      </S.AllSelectBox>
      <CartItem />
      <CartItem />
    </S.Container>
  );
}

export default CartList;

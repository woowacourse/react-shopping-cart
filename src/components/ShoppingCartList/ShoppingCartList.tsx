import SelectAll from '../SelectAll/SelectAll';
import ShoppingCartItem from '../ShoppingCartItem/ShoppingCartItem';
import * as S from './styled';

const ShoppingCartList = () => {
  return (
    <S.Container>
      <SelectAll isSelectAll={false} />
      <ShoppingCartItem />
      <ShoppingCartItem />
    </S.Container>
  );
};

export default ShoppingCartList;

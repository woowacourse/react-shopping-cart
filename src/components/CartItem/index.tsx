import * as S from './CartItem.styles';
import Counter from 'components/@common/Counter';
import { useProductSelect } from 'hooks/useProductSelect';
import { Product } from 'types';
import Svg from 'components/@common/Svg';

const CartItem = ({ product }: { product: Product }) => {
  const { remove, add } = useProductSelect(product);

  return (
    <S.CartItemWrapper>
      <S.CheckBox type="checkbox" />
      <S.CartItemImage src={product.imageUrl} alt={product.name} />
      <S.CartProductName>{product.name}</S.CartProductName>
      <S.CounterWrapper>
        <Svg type="trash-can" width={24} height={24} />
        <Counter count={1} increment={add} decrement={remove} />
        <S.CartProductPrice>
          {product.price.toLocaleString('KR')}원
        </S.CartProductPrice>
      </S.CounterWrapper>
    </S.CartItemWrapper>
  );
};

export default CartItem;

import { Product } from 'src/types';
import Svg from '../@common/Svg';
import * as S from './CartItem.styles';

interface CartItemProps {
  product: Product;
}

const CartItem = ({ product }: CartItemProps) => {
  return (
    <S.ItemWrapper>
      <S.ItemImage src={product.imageUrl} alt={product.name} />
      <S.ProductWrapper>
        <div>
          <S.ProductName>{product.name}</S.ProductName>
          <S.ProductPrice>
            {product.price.toLocaleString('KR')} 원
          </S.ProductPrice>
        </div>
        <Svg type="cart-icon" width={25} height={22} />
      </S.ProductWrapper>
    </S.ItemWrapper>
  );
};

export default CartItem;

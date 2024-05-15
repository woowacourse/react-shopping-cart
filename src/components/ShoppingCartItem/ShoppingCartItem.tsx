import * as S from './styled';
import Checkbox from '../Checkbox/Checkbox';
import DeleteButton from '../DeleteButton/DeleteButton';
import SetQuantity from '../SetQuantity/SetQuantity';
import { CartItem } from '../../api/get/getItems';

interface ShoppingCartItemProps {
  cartItem: CartItem;
}

const ShoppingCartItem = ({ cartItem }: ShoppingCartItemProps) => {
  return (
    <S.Container>
      <S.Hr />
      <S.Header>
        <Checkbox id={cartItem.id} isChecked={true} />
        <DeleteButton />
      </S.Header>
      <S.Contents>
        <S.ProductImage src={cartItem.product.imageUrl} alt="product" />
        <S.ProductDescription>
          <S.ProductName>{cartItem.product.name}</S.ProductName>
          <S.ProductPrice>{cartItem.product.price.toLocaleString()}원</S.ProductPrice>
          <SetQuantity
            quantity={cartItem.quantity}
            onClick={{ plus: () => console.log('춘식이'), minus: () => console.log('준식이') }}
          />
        </S.ProductDescription>
      </S.Contents>
    </S.Container>
  );
};

export default ShoppingCartItem;

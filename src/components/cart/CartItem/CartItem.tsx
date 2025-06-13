import useCartOperations from "../../../domains/cart/hooks/useCartOperations";
import useCartToggle from "../../../domains/cart/hooks/useCartToggle";
import { CartItemWithSelection } from "../../../domains/cart/types/response";
import { formatCurrency } from "../../../utils/formatters";
import { getImageUrl } from "../../../utils/imageUrl";
import Checkbox from "../../@common/Checkbox/Checkbox";
import QuantityCounter from "../../@shared/QuantityCounter/QuantityCounter";
import * as S from "./CartItem.styles";

interface Props {
  item: CartItemWithSelection;
}

const MIN_QUANTITY = 1;

const CartItem = ({ item: { id, quantity, product, selected } }: Props) => {
  const { deleteItem, updateItemQuantity } = useCartOperations();
  const { toggleItemSelected } = useCartToggle();

  return (
    <S.CartItem>
      <S.CartItemHeader>
        <Checkbox selected={selected} onClick={() => toggleItemSelected(id)} />
        <S.DeleteButton onClick={() => deleteItem(id)}>삭제</S.DeleteButton>
      </S.CartItemHeader>
      <S.CartItemWrapper>
        <S.CartItemImage $url={getImageUrl(product.imageUrl)} />
        <S.CartItemInfo>
          <S.CartItemName>{product.name}</S.CartItemName>
          <S.CartItemPrice>{formatCurrency(product.price)}</S.CartItemPrice>
          <QuantityCounter
            quantity={quantity}
            onIncrease={() => updateItemQuantity(id, quantity + 1)}
            onDecrease={() => updateItemQuantity(id, quantity - 1)}
            increaseDisabled={quantity >= product.stock}
            decreaseDisabled={quantity <= MIN_QUANTITY}
          />
        </S.CartItemInfo>
      </S.CartItemWrapper>
    </S.CartItem>
  );
};

export default CartItem;

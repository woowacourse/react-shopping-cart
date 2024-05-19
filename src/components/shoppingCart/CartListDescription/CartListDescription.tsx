import { CartItem } from '@appTypes/shoppingCart';
import { CountButton } from '@components/common';
import { useFetchErrorBoundary, useUpdateCartItemCount } from '@hooks/index';
import { formatKoreanCurrency } from '@utils/index';

import * as Styled from './CartListDescription.styled';
import CountAlertModal from './CountAlertModal';

interface CartListDescriptionContainerProps {
  cartItem: CartItem;
}

const CartListDescription: React.FC<CartListDescriptionContainerProps> = ({ cartItem }) => {
  const { product, quantity } = cartItem;
  const { onUpdateCartItemCount, errorMessage, fetchError } = useUpdateCartItemCount(cartItem);
  useFetchErrorBoundary(fetchError);

  return (
    <Styled.CartItemDescription>
      <Styled.ItemName>{product.name}</Styled.ItemName>
      <Styled.ItemPrice>{formatKoreanCurrency(product.price)}</Styled.ItemPrice>
      <Styled.CartItemButtonGroup>
        <CountButton onClick={() => onUpdateCartItemCount('minus')} sign="minus" />
        <span>{quantity}</span>
        <CountButton onClick={() => onUpdateCartItemCount('plus')} sign="plus" />
      </Styled.CartItemButtonGroup>
      <CountAlertModal errorMessage={errorMessage} />
    </Styled.CartItemDescription>
  );
};

export default CartListDescription;

import * as S from './ReviewCartList.styles';
import ReviewCartItemCard from './ReviewCartItemCard';
import { CartItem } from '../../cart/api/types/cart';

export default function ReviewCartList({ selectedCartItems }: { selectedCartItems: CartItem[] }) {
  return (
    <S.ReviewCartListContainer>
      <S.ReviewCartItemCardContainer>
        {selectedCartItems.map((selectedCartItem) => (
          <ReviewCartItemCard key={selectedCartItem.id} selectedCartItem={selectedCartItem} />
        ))}
      </S.ReviewCartItemCardContainer>
    </S.ReviewCartListContainer>
  );
}

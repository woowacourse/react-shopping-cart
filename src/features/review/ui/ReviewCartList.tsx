import * as S from './ReviewCartList.styles';
import { useCartContext } from '../../../shared/context/useCartContext';
import ReviewCartItemCard from './ReviewCartItemCard';

export default function ReviewCartList() {
  const { selectedCartItems } = useCartContext();

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

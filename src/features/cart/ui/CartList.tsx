import SelectInput from '../../../shared/ui/SelectInput';
import CartItemCard from './CartItemCard';
import * as S from './CartList.styles';

const cartItems = [
  {
    id: 1,
    name: '상품명',
    price: 10000,
    imageUrl: 'https://example.com/image.jpg',
    category: '카테고리',
  },
  {
    id: 2,
    name: '상품명2',
    price: 20000,
    imageUrl: 'https://example.com/image2.jpg',
    category: '카테고리2',
  },
  {
    id: 3,
    name: '상품명3',
    price: 30000,
    imageUrl: 'https://example.com/image3.jpg',
    category: '카테고리3',
  },
  {
    id: 4,
    name: '상품명4',
    price: 40000,
    imageUrl: 'https://example.com/image4.jpg',
    category: '카테고리4',
  },
];

export default function CartList() {
  return (
    <S.CartListContainer>
      <S.AllSelectContainer>
        <SelectInput type='checkbox' />
        <span>전체 선택</span>
      </S.AllSelectContainer>
      <S.CartItemCardContainer>
        {cartItems.map((cartItem) => (
          <CartItemCard key={cartItem.id} cartItem={cartItem} />
        ))}
      </S.CartItemCardContainer>
    </S.CartListContainer>
  );
}

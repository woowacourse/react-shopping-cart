import * as Card from '../components/Card/Card';
import { CartItemType } from '../domain/mapper/cartItemMapper';

export default function SelectedItemCard({ item }: { item: CartItemType }) {
  return (
    <Card.Root>
      <Card.CardImage src={item.imageUrl} alt={item.name} />
      <Card.Content>
        <Card.Title>{item.name}</Card.Title>
        <Card.Price>{(item.price * item.quantity).toLocaleString()}원</Card.Price>
        <p>{item.quantity}개</p>
      </Card.Content>
    </Card.Root>
  );
}

import { ItemDetail, ItemPrice, ItemTitle } from "./CartItemInfo.styles";

interface CartItemInfoProps {
  name: string;
  price: number;
}

export default function CartItemInfo({ name, price }: CartItemInfoProps) {
  return (
    <div css={ItemDetail}>
      <h3 css={ItemTitle}>{name}</h3>
      <p css={ItemPrice}>{price.toLocaleString()}원</p>
    </div>
  );
}

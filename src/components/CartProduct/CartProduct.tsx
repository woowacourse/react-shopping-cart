import { QuantitySelector } from '../QuantitySelector/QuantitySelector';

import {
  CartProductLayout,
  ProductImg,
  ProductName,
  ProductPrice,
  TitleLayout,
} from './CartProduct.style';

interface CartProductProps {
  id: number;
  imageUrl: string;
  name: string;
  price: number;
  quantity: number;
  onChange: () => void;
  isFetching: boolean;
}

export function CartProduct({
  id,
  imageUrl,
  name,
  price,
  quantity,
  onChange,
  isFetching,
}: CartProductProps) {
  return (
    <div
      id={`cartProduct-${id}`}
      aria-label={`${id} 항목`}
      css={CartProductLayout}
      data-testid="cart-product"
    >
      <div css={ProductImg(imageUrl)} />
      <div css={TitleLayout}>
        <p css={ProductName}>{name}</p>
        <p css={ProductPrice}>{price.toLocaleString()}원</p>
        <QuantitySelector
          quantity={quantity}
          cartId={id}
          onChange={onChange}
          isFetching={isFetching}
        />
      </div>
    </div>
  );
}

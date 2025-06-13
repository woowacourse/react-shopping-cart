import { QuantitySelector } from '../QuantitySelector/QuantitySelector';

import {
  CartProductLayout,
  ProductImg,
  ProductName,
  ProductPrice,
  TitleLayout,
  quantityText,
} from './CartProduct.style';

interface BaseProps {
  id: number;
  imageUrl: string;
  name: string;
  price: number;
  quantity: number;
}

interface ControlProps extends BaseProps {
  mode: 'control';
  onChange: () => void;
  isFetching: boolean;
}

interface InfoProps extends BaseProps {
  mode: 'info';
  onChange?: () => void;
  isFetching?: boolean;
}

type CartProductProps = ControlProps | InfoProps;

export function CartProduct({
  id,
  imageUrl,
  name,
  price,
  quantity,
  onChange,
  isFetching,
  mode,
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
        {mode === 'control' ? (
          <QuantitySelector
            quantity={quantity}
            cartId={id}
            onChange={onChange}
            isFetching={isFetching}
          />
        ) : (
          <p css={quantityText}>{quantity}개</p>
        )}
      </div>
    </div>
  );
}

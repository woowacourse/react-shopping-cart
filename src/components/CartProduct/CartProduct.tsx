import Button from "../Button/Button";
import { QuantitySelector } from "../QuantitySelector/QuantitySelector";

import {
  CartProductLayout,
  deleteButton,
  ProductImg,
  ProductName,
  ProductPrice,
  TitleLayout,
} from "./CartProduct.style";

interface CartProductProps {
  id: number;
  imageUrl: string;
  name: string;
  price: number;
  quantity: number;
  maxQuantity: number;
  onChange: () => void;
}

// width: 100%;
// height: 100%;
// background-image: ${(props) => `url(${props.imageUrl})`},
//   url('https://lh3.googleusercontent.com/proxy/3Fqjhno28S6v1khXPS44ukHF-8y2Kue7oKfnyqCR4_vX7ze7O20WFu7CzZTq_KQaLwDrpMUNFhUD345MdmKB9ZzzejPJCfHmRAf2rMIzQhkFy9n9kMPPAf4hi7wIZm0cmjLSnTkiaj3g9mAA');
// background-repeat: no-repeat;
// background-size: cover;
// background-position: center;
// border-radius: 8px 8px 0px 0px;

export function CartProduct({
  id,
  imageUrl,
  name,
  price,
  quantity,
  maxQuantity,
  onChange,
}: CartProductProps) {
  const handleDelete = async () => {
    // await deleteCartItem({ id });
    // onChange();
  };

  return (
    <section
      id={`cartProduct-${id}`}
      aria-label={`${id} 항목`}
      css={CartProductLayout}
      data-testid="cart-product"
    >
      <div>
        <img src={imageUrl} css={ProductImg} />
      </div>
      <div css={TitleLayout}>
        <p css={ProductName}>{name}</p>
        <p css={ProductPrice}>{price.toLocaleString()}원</p>
        <QuantitySelector
          quantity={quantity}
          cartId={id}
          onChange={onChange}
          maxQuantity={maxQuantity}
        />
      </div>
      <div css={deleteButton}>
        <Button onClick={handleDelete} style="ghost">
          삭제
        </Button>
      </div>
    </section>
  );
}

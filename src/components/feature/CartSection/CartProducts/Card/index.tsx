import * as S from "./Card.styles";
import CartCount from "./CartCount";
import Button from "../../../../common/Button";
import CheckBox from "../../../../common/CheckBox";
import Line from "../../../../common/Line";
import { CartProduct } from "../../../../../type/cart";
import { formatPrice } from "../../../../../utils/formatPrice";
type Props = {
  cartItem: CartProduct;
  isChecked: boolean;
  onToggle: () => void;
  onDelete: (id: number) => void;
  onUpdate: (id: number, count: number) => void;
};

const Card = ({ cartItem, isChecked, onToggle, onDelete, onUpdate }: Props) => {
  const { imageUrl, name, price } = cartItem.product;

  return (
    <S.CardContainer>
      <S.ButtonSection>
        <CheckBox
          isChecked={isChecked}
          onChange={onToggle}
          testId={`check-box${cartItem.id}`}
        />
        <Button onClick={() => onDelete(cartItem.id)} title="삭제" />
      </S.ButtonSection>

      <S.CardInfoSection>
        <S.ImgSection
          src={imageUrl}
          alt={name}
          onError={(e) => (e.currentTarget.src = "./null-image.png")}
        />
        <S.ProductInfoSection>
          <S.ProductDescription>
            <S.ProductName>{name}</S.ProductName>
            <S.ProductPrice>{formatPrice(price)}</S.ProductPrice>
          </S.ProductDescription>
          <CartCount
            count={cartItem.quantity}
            onPlusCount={() => onUpdate(cartItem.id, cartItem.quantity + 1)}
            onMinusCount={() => onUpdate(cartItem.id, cartItem.quantity - 1)}
            testId={`count${cartItem.id}`}
          />
        </S.ProductInfoSection>
      </S.CardInfoSection>
      <Line />
    </S.CardContainer>
  );
};

export default Card;

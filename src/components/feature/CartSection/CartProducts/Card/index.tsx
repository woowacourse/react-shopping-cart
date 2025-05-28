import * as S from "./Card.styles";
import { useState } from "react";
import CartCount from "./CartCount";
import Button from "../../../../common/Button";
import CheckBox from "../../../../common/CheckBox";
import Line from "../../../../common/Line";
import { CartProduct } from "../../../../../type/cart";

const Card = ({ cartItem }: { cartItem: CartProduct }) => {
  const [isChecked, setIsChecked] = useState(false);
  const { imageUrl, name, price } = cartItem.product;
  const [quantity, setQuantity] = useState(cartItem.quantity);

  return (
    <>
      <S.CardContainer>
        <S.ButtonSection>
          <CheckBox
            isChecked={isChecked}
            onChange={() => setIsChecked(!isChecked)}
          />
          <Button onClick={() => {}} title="삭제" />
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
              <S.ProductPrice>{price}</S.ProductPrice>
            </S.ProductDescription>
            <CartCount
              count={quantity}
              onPlusCount={() => setQuantity((prev) => prev + 1)}
              onMinusCount={() => {
                quantity > 0 && setQuantity((prev) => prev - 1);
              }}
            />
          </S.ProductInfoSection>
        </S.CardInfoSection>
      </S.CardContainer>
      <Line />
    </>
  );
};

export default Card;

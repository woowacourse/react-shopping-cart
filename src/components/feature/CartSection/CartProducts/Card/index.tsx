import * as S from "./Card.styles";
import { useState } from "react";
import CartCount from "./CartCount";
import Button from "../../../../common/Button";
import CheckBox from "../../../../common/CheckBox";

const product = { name: "모자", price: "1000원", imageUrl: "d" };

const Card = () => {
  const [quantity, setQuantity] = useState(0);
  const [isChecked, setIsChecked] = useState(false);
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
            src={product.imageUrl}
            alt={product.name}
            onError={(e) => (e.currentTarget.src = "./null-image.png")}
          />
          <S.ProductInfoSection>
            <S.ProductDescription>
              <S.ProductName>{product.name}</S.ProductName>
              <S.ProductPrice>{product.price}</S.ProductPrice>
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
      <S.Line />
    </>
  );
};

export default Card;

import * as S from "./Card.styles";
import { useState } from "react";
import CartCount from "./CartCount";
import Button from "../../../../common/Button";
import CheckBox from "../../../../common/CheckBox";
import Line from "../../../../common/Line";
import { CartProduct } from "../../../../../type/cart";
import { deleteCartProduct } from "../../../../../api/cart/deleteCartProduct";
import { updateCartProduct } from "../../../../../api/cart/updateCartProduct";

const Card = ({
  cartItem,
  onRefetch,
}: {
  cartItem: CartProduct;
  onRefetch: () => void;
}) => {
  const [isChecked, setIsChecked] = useState(false);
  const { imageUrl, name, price } = cartItem.product;

  const handleDelete = async (id: number) => {
    await deleteCartProduct(id);
    onRefetch();
  };

  const handleUpdate = async (id: number, updatedQuantity: number) => {
    await updateCartProduct(id, updatedQuantity);
    onRefetch();
  };

  return (
    <>
      <S.CardContainer>
        <S.ButtonSection>
          <CheckBox
            isChecked={isChecked}
            onChange={() => setIsChecked(!isChecked)}
          />
          <Button onClick={() => handleDelete(cartItem.id)} title="삭제" />
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
              count={cartItem.quantity}
              onPlusCount={() =>
                handleUpdate(cartItem.id, cartItem.quantity + 1)
              }
              onMinusCount={() =>
                handleUpdate(cartItem.id, cartItem.quantity - 1)
              }
            />
          </S.ProductInfoSection>
        </S.CardInfoSection>
      </S.CardContainer>
      <Line />
    </>
  );
};

export default Card;

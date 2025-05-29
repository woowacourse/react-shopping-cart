import * as S from "./Card.styles";
import CartCount from "./CartCount";
import Button from "../../../../common/Button";
import CheckBox from "../../../../common/CheckBox";
import Line from "../../../../common/Line";
import { CartProduct } from "../../../../../type/cart";
import { deleteCartProduct } from "../../../../../api/cart/deleteCartProduct";
import { formatPrice } from "../../../../../utils/formatPrice";
import { useShowError } from "../../../../../provider/errorProvider";
import { updateCartProduct } from "../../../../../api/cart/updateCartProduct";

type Props = {
  cartItem: CartProduct;
  isChecked: boolean;
  onRefetch: () => void;
  onToggle: () => void;
  onDeleteSelected: () => void;
};

const Card = ({
  cartItem,
  onRefetch,
  isChecked,
  onToggle,
  onDeleteSelected,
}: Props) => {
  const { imageUrl, name, price } = cartItem.product;
  const showError = useShowError();

  const handleDelete = async (id: number) => {
    try {
      await deleteCartProduct(id);
      onDeleteSelected();
      onRefetch();
    } catch (e) {
      showError?.("데이터를 삭제하는 중 문제가 발생했습니다.");
    }
  };

  const handleUpdate = async (id: number, updatedQuantity: number) => {
    try {
      await updateCartProduct(id, updatedQuantity);
      onRefetch();
    } catch (e) {
      showError?.("상품을 추가/삭제하는 중 문제가 발생했습니다.");
    }
  };

  return (
    <>
      <S.CardContainer>
        <S.ButtonSection>
          <CheckBox isChecked={isChecked} onChange={onToggle} />
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
              <S.ProductPrice>{formatPrice(price)}</S.ProductPrice>
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

import * as S from "./Item.styles";
import Hr from "../../common/Hr/Hr";
import emptyIcon from "/emptyIcon.png";
import useCartItemList from "../../../hooks/useCartItemList";

interface ItemProps {
  id: number;
  imageUrl: string;
  name: string;
  price: number;
  quantity: number;
}

export default function Item({
  id,
  imageUrl,
  name,
  price,
  quantity,
}: ItemProps) {
  const { patchCartItem, removeCartItem } = useCartItemList();

  const handleClickAddItem = (id: number, quantity: number) => {
    patchCartItem(id, quantity + 1);
  };

  const handleClickAbstractItem = (id: number, quantity: number) => {
    patchCartItem(id, quantity - 1);
  };

  const handleClickRemoveItem = (id: number) => {
    removeCartItem(id);
  };

  return (
    <div>
      <Hr />
      <S.Content>
        <S.Checkbox type="checkbox" />
        <S.Button
          width="40"
          height="24"
          onClick={() => handleClickRemoveItem(id)}
        >
          삭제
        </S.Button>
      </S.Content>
      <S.Content>
        <S.Image
          src={imageUrl}
          alt={name}
          onError={(e) => (e.currentTarget.src = emptyIcon)}
        />
        <S.ButtonContainer>
          <S.A>
            <S.Flex direction="column">
              <S.ItemName>{name}</S.ItemName>
              <S.ItemPrice>{price.toLocaleString()}원</S.ItemPrice>
            </S.Flex>

            <S.Flex direction="row">
              <S.Button
                width="24"
                height="24"
                onClick={() => handleClickAbstractItem(id, quantity)}
              >
                -
              </S.Button>
              <S.Quantity>{quantity}</S.Quantity>
              <S.Button
                width="24"
                height="24"
                onClick={() => handleClickAddItem(id, quantity)}
              >
                +
              </S.Button>
            </S.Flex>
          </S.A>
        </S.ButtonContainer>
      </S.Content>
    </div>
  );
}

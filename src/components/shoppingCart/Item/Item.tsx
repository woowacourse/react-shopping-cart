import * as S from "./Item.styles";

import Hr from "../../common/Hr/Hr";

import emptyIcon from "../../../assets/emptyIcon.png";

import useCartItemList from "../../../hooks/useCartItemList";

interface ItemProps {
  id: number;
  imageUrl: string;
  name: string;
  price: number;
  quantity: number;
  isChecked: boolean;
  handleSelectedCartItem: (id: number) => void;
}

export default function Item({
  id,
  imageUrl,
  name,
  price,
  quantity,
  isChecked,
  handleSelectedCartItem,
}: ItemProps) {
  const { patchCartItem, removeCartItem } = useCartItemList();

  const onIncrease = () => patchCartItem(id, quantity + 1);
  const onDecrease = () => patchCartItem(id, quantity - 1);
  const onRemove = () => removeCartItem(id);

  return (
    <div>
      <Hr />

      <S.Content>
        <S.Checkbox
          type="checkbox"
          checked={isChecked}
          onChange={() => handleSelectedCartItem(id)}
        />
        <S.Button width="40" height="24" onClick={onRemove}>
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
              <S.Button width="24" height="24" onClick={onDecrease}>
                -
              </S.Button>
              <S.Quantity>{quantity}</S.Quantity>
              <S.Button width="24" height="24" onClick={onIncrease}>
                +
              </S.Button>
            </S.Flex>
          </S.A>
        </S.ButtonContainer>
      </S.Content>
    </div>
  );
}

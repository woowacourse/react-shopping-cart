import Hr from "../../common/Hr/Hr";

import useCartItemList from "../../../hooks/useCartItemList";

import * as Styled from "./Item.styles";

import emptyIcon from "../../../assets/emptyIcon.png";

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
      <Styled.ButtonContainer>
        <Styled.Input
          type="checkbox"
          checked={isChecked}
          onChange={() => handleSelectedCartItem(id)}
        />
        <Styled.Button width="40" height="24" onClick={onRemove}>
          삭제
        </Styled.Button>
      </Styled.ButtonContainer>

      <Styled.ItemContainer>
        <Styled.Image
          src={imageUrl}
          alt={name}
          onError={(e) => (e.currentTarget.src = emptyIcon)}
        />
        <Styled.InfoContainer direction="column" justifyContent="space-around">
          <Styled.PriceContainer direction="column">
            <Styled.Name>{name}</Styled.Name>
            <Styled.Price>{price.toLocaleString()}원</Styled.Price>
          </Styled.PriceContainer>

          <Styled.QuantityButtonContainer direction="row">
            <Styled.Button width="24" height="24" onClick={onDecrease}>
              -
            </Styled.Button>
            <Styled.Quantity>{quantity}</Styled.Quantity>
            <Styled.Button width="24" height="24" onClick={onIncrease}>
              +
            </Styled.Button>
          </Styled.QuantityButtonContainer>
        </Styled.InfoContainer>
      </Styled.ItemContainer>
    </div>
  );
}

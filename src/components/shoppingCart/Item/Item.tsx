import * as S from "./Item.styles";
import Hr from "../../common/Hr/Hr";
import emptyIcon from "/emptyIcon.png";

interface ItemProps {
  imageUrl: string;
  name: string;
  price: number;
  quantity: number;
}

export default function Item({ imageUrl, name, price, quantity }: ItemProps) {
  return (
    <div>
      <Hr />
      <S.Content>
        <S.Checkbox type="checkbox" />
        <S.Button width="40" height="24">
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
              <S.Button width="24" height="24">
                -
              </S.Button>
              <S.Quantity>{quantity}</S.Quantity>
              <S.Button width="24" height="24">
                +
              </S.Button>
            </S.Flex>
          </S.A>
        </S.ButtonContainer>
      </S.Content>
    </div>
  );
}

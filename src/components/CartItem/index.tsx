import { CartItemType } from "../../types";
import Button from "../common/Button";
import { useRecoilState } from "recoil";
import { isSelectedState } from "../../recoil/atoms/atoms";
import FilledCheck from "../../assets/icon/FilledCheck";

import {
  Wrapper,
  ItemImg,
  Header,
  Body,
  ItemPrice,
  ItemInfo,
  ItemInfoWrapper,
  ItemQuantity,
} from "./style";
import OutlineCheck from "../../assets/icon/OutlineCheck";

interface CardItemProps {
  cartItem: CartItemType;
}

const CardItem = ({ cartItem }: CardItemProps) => {
  // 선택 boolean, 상품 name, price, quantity, 삭제 버튼
  const { id, product, quantity } = cartItem;
  const [isSelected, setIsSelected] = useRecoilState<{
    [key: number]: boolean;
  }>(isSelectedState);

  const handleToggleSelectItem = () => {
    const copyIsSelected = { ...isSelected };
    copyIsSelected[id] = !copyIsSelected[id];
    setIsSelected(copyIsSelected);
  };

  return (
    <Wrapper>
      <Header>
        <Button $borderRadius="8px" onClick={handleToggleSelectItem}>
          {isSelected[id] ? <FilledCheck color="white" /> : <OutlineCheck />}
        </Button>
        <Button $theme="white" $size="s">
          삭제
        </Button>
      </Header>
      <Body>
        <ItemImg src={product.imageUrl} />
        <ItemInfoWrapper>
          <ItemInfo>
            <span>{product.name}</span>
            <ItemPrice>{product.price.toLocaleString("ko-KR")}</ItemPrice>
          </ItemInfo>
          <ItemQuantity>
            <Button $theme="white" $size="xs">
              +
            </Button>
            <span>{quantity}</span>
            <Button $theme="white" $size="xs">
              -
            </Button>
          </ItemQuantity>
        </ItemInfoWrapper>
      </Body>
    </Wrapper>
  );
};

export default CardItem;

import { styled } from "styled-components";
import type { ItemType } from "../types/domain";
import { CartGrayIcon } from "../assets";
import Counter from "./Counter";
import { useSetRecoilState } from "recoil";
import { itemQuantitySelector } from "../recoil/selector";
import { MIN_QUANTITY } from "../constants";

const Item = ({ id, name, price, imageUrl, quantity }: ItemType) => {
  const setItemQuantity = useSetRecoilState(itemQuantitySelector);

  const increaseItemQuantity = () => {
    setItemQuantity({ id: id, quantity: Number(quantity) + 1 });
  };

  return (
    <ItemWrapper>
      <img src={imageUrl} alt="상품이미지" />
      <NameWrapper>{name}</NameWrapper>
      <PriceWrapper>{price.toLocaleString()}원</PriceWrapper>
      <IconWrapper>
        {quantity === MIN_QUANTITY.toString() ? (
          <img src={CartGrayIcon} alt={"카트"} onClick={increaseItemQuantity} />
        ) : (
          <Counter itemId={id} />
        )}
      </IconWrapper>
    </ItemWrapper>
  );
};

const ItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 282px;
  height: auto;

  & > img {
    width: 100%;
    height: 100%;
  }
`;

const NameWrapper = styled.p`
  margin: 15px 0 10px 10px;
  font-size: 16px;
`;

const PriceWrapper = styled.p`
  margin-left: 10px;
  font-size: 20px;
`;

const IconWrapper = styled.div`
  position: absolute;
  bottom: 20px;
  right: 10px;
  cursor: pointer;

  & > img {
    width: 24px;
    height: 24px;
    transform: scaleX(-1);
  }
`;

export default Item;

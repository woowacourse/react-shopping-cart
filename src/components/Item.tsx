import { styled } from "styled-components";
import type { ItemType } from "../types/domain";
import { CartGrayIcon } from "../assets";
import Counter from "./Counter";
import { MIN_QUANTITY } from "../constants";
import { useQuantity } from "../hooks/useQuantity";

const Item = ({ id, name, price, imageUrl }: ItemType) => {
  const { quantity, setNewQuantity } = useQuantity(id);

  const handleCartClicked = () => {
    setNewQuantity(Number(quantity) + 1);
  };

  return (
    <ItemWrapper>
      <img src={imageUrl} alt="상품이미지" />
      <NameWrapper>{name}</NameWrapper>
      <PriceWrapper>{price.toLocaleString()}원</PriceWrapper>
      <IconWrapper>
        {quantity === MIN_QUANTITY.toString() ? (
          <img src={CartGrayIcon} alt={"카트"} onClick={handleCartClicked} />
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

  & > img {
    width: 100%;
    height: 100%;
  }
`;

const NameWrapper = styled.div`
  width: 190px;
  margin: 15px 0 10px 10px;
  font-size: 16px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  word-break: break-all;

  @media screen and (max-width: 800px) {
    font-size: 13px;
  }
`;

const PriceWrapper = styled.p`
  margin-left: 10px;
  font-size: 20px;

  @media screen and (max-width: 800px) {
    font-size: 16px;
  }
`;

const IconWrapper = styled.div`
  position: absolute;
  bottom: 20px;
  right: 10px;
  cursor: pointer;

  & > img {
    width: 24px;
    height: 24px;
    transition: all 0.4s ease-out;

    &:hover {
      transform: scale(1.12);
      opacity: 60%;
    }
  }
  @media screen and (max-width: 1200px) {
    bottom: -5px;
  }
`;

export default Item;

import { styled } from "styled-components";
import type { ItemType } from "../types/domain";
import { CartGrayIcon } from "../assets";
import Counter from "./Counter";

const Item = ({ name, price, imageUrl, count = 0 }: ItemType) => {
  const handleCountIncreased = () => {
    console.log(1);
  };

  const handleCountDecreased = () => {
    console.log(1);
  };

  return (
    <ItemWrapper>
      <img src={imageUrl} alt="상품이미지" />
      <NameWrapper>{name}</NameWrapper>
      <PriceWrapper>{price.toLocaleString()}원</PriceWrapper>
      <IconWrapper>
        {count === 1 ? (
          <img src={CartGrayIcon} alt={"카트"} />
        ) : (
          <Counter
            count={count}
            increase={handleCountIncreased}
            decrease={handleCountDecreased}
          />
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

  & > img {
    width: 24px;
    height: 24px;
    transform: scaleX(-1);
  }
`;

export default Item;

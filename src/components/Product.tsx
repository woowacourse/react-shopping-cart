import styled from "styled-components";
import type { ProductType } from "../types/domain";
import { useQuantity } from "../hooks/useQuantity";
import { CartGrayIcon } from "../assets";
import Counter from "./Counter";
import { MIN_QUANTITY } from "../constants";

const Product = ({ id, name, price, imageUrl }: ProductType) => {
  const { quantity, setNewQuantity } = useQuantity(id);

  const handleCartClicked = () => {
    setNewQuantity(Number(quantity) + 1);
  };

  return (
    <Wrapper>
      <img src={imageUrl} alt="상품이미지" />
      <NameBox>{name}</NameBox>
      <PriceBox>{price.toLocaleString()}원</PriceBox>
      <IconContainer>
        {quantity === MIN_QUANTITY.toString() ? (
          <img src={CartGrayIcon} alt={"카트"} onClick={handleCartClicked} />
        ) : (
          <Counter itemId={id} />
        )}
      </IconContainer>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  position: relative;

  & > img {
    width: 100%;
    height: 100%;
    border-radius: 5px;

    &:hover {
      background-color: var(--shadow-gray);
      box-shadow: 0 10px 10px -3px var(--shadow-gray);
      transition: all 0.3s ease;
    }
  }
`;

const NameBox = styled.div`
  width: 190px;
  margin: 15px 0 10px 10px;

  font-size: 16px;
  white-space: nowrap;

  word-break: break-all;
  text-overflow: ellipsis;
  overflow: hidden;

  @media screen and (max-width: 800px) {
    font-size: 13px;
  }
`;

const PriceBox = styled.p`
  margin-left: 10px;

  font-size: 20px;

  @media screen and (max-width: 800px) {
    font-size: 16px;
  }
`;

const IconContainer = styled.div`
  position: absolute;
  right: 10px;
  bottom: 20px;

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

export default Product;

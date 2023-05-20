import styled from "styled-components";
import { useQuantity } from "hooks/useQuantity";
import { MIN_QUANTITY } from "constants/";
import QuantityCounter from "components/QuantityCounter";
import { CartProduct } from "types/domain";

const Item = (product: CartProduct) => {
  const { quantity, changeQuantity } = useQuantity(product.id);

  const handleCartClicked = () => {
    fetch("/cart-items", { method: "POST", body: JSON.stringify({ productId: product.id }) })
      .then(() => changeQuantity("1"))
      .catch((err) => {
        console.log(`장바구니 상품 추가 실패: ${err instanceof Error ? err.message : ""}`);
      });
  };

  return (
    <Wrapper>
      <img src={product.imageUrl} alt={`${product.name} 상품 이미지`} />
      <NameBox>{product.name}</NameBox>
      <PriceBox>{product.price.toLocaleString()}원</PriceBox>
      <IconContainer>
        {quantity === MIN_QUANTITY.toString() ? (
          <img
            src={process.env.PUBLIC_URL + "/assets/cart-gray-icon.svg"}
            alt={"카트"}
            onClick={handleCartClicked}
          />
        ) : (
          <QuantityCounter itemId={product.id} />
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
      background-color: rgba(0, 0, 0, 0.25);
      box-shadow: 0 10px 10px -3px rgba(0, 0, 0, 0.25);
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

export default Item;

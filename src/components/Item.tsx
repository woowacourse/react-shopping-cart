import styled from "styled-components";
import QuantityCounter from "components/QuantityCounter";
import { Product } from "types/domain";
import { addCartItem } from "api/cartItems";
import { cartSelector } from "recoil/cart";
import { useRecoilState } from "recoil";

const Item = (item: Product) => {
  const [cartItem, setCartItem] = useRecoilState(cartSelector(item.id));

  const handleCartClicked = async () => {
    const result = await addCartItem(item.id);

    if (!result) {
      alert("장바구니 상품 추가 실패!");
      return;
    }

    setCartItem({ id: item.id, quantity: 1, isChecked: true, product: item });
  };

  return (
    <Wrapper>
      <img src={item.imageUrl} alt={`${item.name} 상품 이미지`} />
      <NameBox>{item.name}</NameBox>
      <PriceBox>{item.price.toLocaleString()}원</PriceBox>
      <IconContainer>
        {!cartItem ? (
          <img
            src={process.env.PUBLIC_URL + "/assets/cart-gray-icon.svg"}
            alt={"카트"}
            onClick={handleCartClicked}
          />
        ) : (
          <QuantityCounter itemId={item.id} />
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

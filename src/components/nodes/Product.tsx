import { useEffect, useState } from "react";
import styled from "styled-components";
import useCart from "../../hooks/useCart";

interface ProductProps {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}

export default function Product(props: ProductProps) {
  const { id, name, price, imageUrl } = props;
  const [cart, addOrder, removeOrder, updateQuantity] = useCart();
  const [quantityInput, setQuantityInput] = useState("");
  const order = cart.find((order) => order.product.id === id);

  const handleClickIcon = () => {
    const newOrder = { id: Date.now(), quantity: 1, product: props };
    addOrder(newOrder);
    setQuantityInput("1");
  };

  const isNumeric = (value: string) => {
    return (
      value !== "" &&
      value.split("").every((char) => "0123456789".includes(char))
    );
  };

  const handleChangeCounter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "") {
      setQuantityInput("");
    } else if (isNumeric(value)) {
      setQuantityInput(Number(value) > 1000 ? "1000" : value);
    }
  };

  const handleBlurCounter = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "") removeOrder(id);
  };

  useEffect(() => {
    if (!isNumeric(quantityInput)) return;

    const quantity = Number(quantityInput);
    if (quantity === 0) {
      removeOrder(id);
    } else {
      updateQuantity(id, quantity);
    }
  }, [quantityInput]);

  useEffect(() => {
    if (order) setQuantityInput(String(order.quantity));
  }, []);

  return (
    <S.Wrapper>
      <S.Img src={`./assets/mockImages/${imageUrl}`} />
      <S.InfoBox>
        <S.LabelBox>
          <S.Name>{name}</S.Name>
          <S.Price>{price.toLocaleString()} 원</S.Price>
        </S.LabelBox>
        <S.ControlBox>
          {order ? (
            <S.Counter
              type="number"
              value={quantityInput}
              onChange={handleChangeCounter}
              onBlur={handleBlurCounter}
            />
          ) : (
            <S.CartIcon
              src="./assets/cart.svg"
              onClick={handleClickIcon}
            ></S.CartIcon>
          )}
        </S.ControlBox>
      </S.InfoBox>
    </S.Wrapper>
  );
}

const Wrapper = styled.div`
  width: 282px;
  height: 362px;

  color: #333333;
`;

const Img = styled.img`
  width: 100%;
  height: 282px;
`;

const InfoBox = styled.div`
  display: flex;
  justify-content: space-between;

  width: 282px;

  padding-top: 18px;
  padding-left: 18px;
`;

const LabelBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Name = styled.p`
  margin-top: 4px;

  font-size: 16px;
  font-weight: 400;
`;

const Price = styled.p`
  margin-top: 10px;

  vertical-align: center;
  font-size: 20px;
  font-weight: 400;
`;

const CartIcon = styled.img`
  width: 26px;
  height: 24px;
  margin-right: 10px;

  cursor: pointer;
`;

const ControlBox = styled.div`
  width: auto;
`;

const Counter = styled.input`
  width: 64px;
  height: 28px;
  border: 1px solid #dddddd;
  border-radius: 0px;

  text-align: center;

  &::-webkit-inner-spin-button {
    opacity: 1;
    height: 28px;
  }
`;

const S = {
  Wrapper,
  Img,
  InfoBox,
  LabelBox,
  Name,
  Price,
  CartIcon,
  ControlBox,
  Counter,
};

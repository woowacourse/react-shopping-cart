import { useRecoilValue } from "recoil";
import type { ProductListType } from "../types/domain";
import styled from "styled-components";
import type { ProductType } from "../types/domain";
import { useQuantity } from "../hooks/useQuantity";
import { TrashCanIcon } from "../assets";
import { Counter } from "./Counter";
import { cartProductsSelector } from "../recoil/selector";

export const CartProductList = () => {
  const products = useRecoilValue<ProductListType>(cartProductsSelector);

  return (
    <Wrapper>
      <TitleBox>든든배송 상품 ({products.length}개)</TitleBox>
      {products.map((product) => (
        <CartProduct key={crypto.randomUUID()} {...product} />
      ))}
    </Wrapper>
  );
};

const CartProduct = ({ id, name, price, imageUrl }: ProductType) => {
  const { quantity, setNewQuantity } = useQuantity(id);

  const handleCartClicked = () => {
    setNewQuantity(Number(quantity) + 1);
  };

  return (
    <ProductWrapper>
      <TrashCanIconBox>
        <img src={TrashCanIcon} alt="휴지통" />
      </TrashCanIconBox>
      <CheckBox type="checkbox" />
      <img src={imageUrl} alt="상품이미지" />
      <Container>
        <NameBox>{name}</NameBox>
        <CounterBox>
          <Counter itemId={id} />
        </CounterBox>
        <PriceBox>{price.toLocaleString()}원</PriceBox>
      </Container>
    </ProductWrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  width: 55%;
  flex-direction: column;
`;

const TitleBox = styled.div`
  width: 100%;
  height: 40px;

  font-size: 18px;
  text-align: start;
  border-bottom: 3px solid #aaaaaa;
`;

const ProductWrapper = styled.div`
  display: flex;

  padding: 15px 0;
  position: relative;

  border-bottom: 1.5px solid #cccccc;

  & > img {
    width: 130px;
    height: 130px;
    border-radius: 5px;
  }
`;

const TrashCanIconBox = styled.div`
  position: absolute;
  top: 20px;
  right: 10px;

  & > img {
    width: 20px;
    height: 20px;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
`;

const CheckBox = styled.input`
  align-self: flex-start;
  width: 20px;
  height: 20px;
  margin-right: 10px;
`;

const NameBox = styled.div`
  width: 350px;
  margin: 5px 15px;

  font-size: 18px;
  white-space: nowrap;

  word-break: break-all;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const PriceBox = styled.p`
  align-self: flex-end;

  font-size: 14px;
`;

const CounterBox = styled.div`
  align-self: flex-end;
`;

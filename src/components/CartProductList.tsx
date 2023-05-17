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
  const { setNewQuantity } = useQuantity(id);

  const handleTrashCanClicked = () => {
    setNewQuantity(0);
  };

  return (
    <ProductWrapper>
      <TrashCanIconBox>
        <img src={TrashCanIcon} alt="휴지통" onClick={handleTrashCanClicked} />
      </TrashCanIconBox>
      <CheckBoxLabel htmlFor="checkProduct">
        <CheckBox id="checkProduct" type="checkbox" />
      </CheckBoxLabel>
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
  flex-direction: column;
  min-width: 55%;
  max-width: 600px;
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

    cursor: pointer;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
`;

const CheckBoxLabel = styled.label`
  align-self: flex-start;
  margin-right: 10px;
`;

const CheckBox = styled.input`
  appearance: none;
  border: 1.5px solid #22a6a2;
  border-radius: 2px;
  width: 24px;
  height: 24px;

  &:checked {
    color: white;
    background-color: var(--dark-gray);
    background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e");
    border: 1px solid #3288ff;
  }
`;

const NameBox = styled.div`
  max-width: 360px;
  min-width: 200px;
  margin: 5px 15px;

  font-size: 18px;
  white-space: nowrap;

  word-break: break-all;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const PriceBox = styled.p`
  align-self: end;

  font-size: 14px;
`;

const CounterBox = styled.div`
  align-self: end;
`;

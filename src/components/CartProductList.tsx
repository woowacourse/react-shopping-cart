import { useRecoilValue } from "recoil";
import type { ProductListType, ProductType } from "../types/domain";
import styled from "styled-components";
import { TrashCanIcon } from "../assets";
import { Counter } from "./Counter";
import { cartProductsSelector } from "../recoil/selector";
import { useCheckBox } from "../hooks/useCheckBox";
import { deleteCartItem } from "../api";
import { selectedProductsState } from "../recoil/atom";
import { useFetch } from "../hooks/useFetch";

export const CartProductList = () => {
  const cartProducts = useRecoilValue<ProductListType>(cartProductsSelector);
  const selectedProducts = useRecoilValue<ProductListType>(
    selectedProductsState
  );
  const { fetchNewProducts } = useFetch();
  const {
    checkedArray,
    allChecked,
    removeCheckedArray,
    removeTargetIndex,
    handleCheckBox,
    handleAllCheckBox,
  } = useCheckBox();

  const handleDeleteButtonClicked = () => {
    selectedProducts.forEach((product) => {
      deleteCartItem(product.id);
    });

    removeCheckedArray();
    fetchNewProducts();
  };

  const handleDelete = (id: number, index: number) => async () => {
    await deleteCartItem(id);

    removeTargetIndex(index);
    fetchNewProducts();
  };

  return (
    <Wrapper>
      <TitleBox>든든배송 상품 ({cartProducts.length}개)</TitleBox>
      <CartProductsContainer>
        {cartProducts.map((product, index) => (
          <CartProduct
            key={product.id}
            {...product}
            checked={checkedArray[index]}
            onDeleteHandler={handleDelete(product.id, index)}
            onChangeHandler={handleCheckBox(index)}
          />
        ))}
      </CartProductsContainer>
      <AllCheckContainer>
        <CheckBoxLabel htmlFor="allProduct">
          <CheckBox
            id="allProduct"
            type="checkbox"
            checked={allChecked}
            onClick={handleAllCheckBox}
          />
        </CheckBoxLabel>
        <p>
          전체선택 ({selectedProducts.length}/{cartProducts.length})
        </p>
        <button onClick={handleDeleteButtonClicked}>선택삭제</button>
      </AllCheckContainer>
    </Wrapper>
  );
};

interface CartProductType extends ProductType {
  checked: boolean;
  onDeleteHandler: () => Promise<void>;
  onChangeHandler: () => void;
}

const CartProduct = ({
  id,
  name,
  price,
  imageUrl,
  checked,
  onDeleteHandler,
  onChangeHandler,
}: CartProductType) => {
  return (
    <ProductWrapper>
      <TrashCanIconBox>
        <img src={TrashCanIcon} alt="휴지통" onClick={onDeleteHandler} />
      </TrashCanIconBox>
      <CheckBoxLabel htmlFor="checkProduct">
        <CheckBox
          id="checkProduct"
          type="checkbox"
          checked={checked}
          onChange={onChangeHandler}
        />
      </CheckBoxLabel>
      <img src={imageUrl} alt="상품이미지" />
      <Container>
        <NameBox>{name}</NameBox>
        <CounterBox>
          <Counter itemId={id} deleteable={false} />
        </CounterBox>
        <PriceBox>{price.toLocaleString()}원</PriceBox>
      </Container>
    </ProductWrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 750px;
`;

const TitleBox = styled.div`
  width: 100%;
  height: 40px;

  font-size: 18px;
  text-align: start;
  border-bottom: 3px solid #aaaaaa;
`;

const ProductWrapper = styled.section`
  display: flex;
  min-width: 100%;
  padding: 15px 0;

  position: relative;
  border-bottom: 1.5px solid #cccccc;

  & > img {
    width: 130px;
    height: 130px;
    border-radius: 5px;

    @media screen and (max-width: 850px) {
      width: 100px;
      height: 100px;
    }
  }

  &:last-of-type {
    border: none;
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

const CartProductsContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 100%;
  max-height: 500px;
  overflow: scroll;
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
  width: 300px;
  margin: 5px 15px;

  font-size: 18px;
  white-space: nowrap;

  word-break: break-all;
  text-overflow: ellipsis;
  overflow: hidden;

  @media screen and (max-width: 850px) {
    width: 140px;
  }
`;

const PriceBox = styled.p`
  align-self: end;

  font-size: 14px;
`;

const CounterBox = styled.div`
  align-self: end;
`;

const AllCheckContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 15px 0;

  & > label {
    margin-top: 5px;
  }

  & > p {
    font-size: 16px;
    margin-right: 10px;
  }

  & > button {
    width: 98px;
    height: 35px;
    background: transparent;
    cursor: pointer;

    border: 1px solid #bbbbbb;
  }
`;

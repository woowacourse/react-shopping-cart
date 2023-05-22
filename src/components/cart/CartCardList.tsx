import styled from "styled-components";
import { CartCard } from "./CartCard";
import { TotalPrice } from "./TotalPrice";
import { Checkbox } from "../common/Checkbox";
import { useCartList } from "../../hooks/useCartList";

export const CartCardList = () => {
  const {
    isSelected,
    isAllSelected,
    toggleSelectedItem,
    toggleAllItem,
    removeItemFromCartList,
    deleteSelectedItems,
    totalPrice,
    cartList,
    selectedItemIds,
  } = useCartList();
  if (cartList.length === 0) return <></>;

  return (
    <Style.Container>
      <Style.ListContainer>
        <Style.CartAmount>{`든든배송상품 (${cartList.length}개)`}</Style.CartAmount>
        <Style.List>
          {cartList.map((item) => (
            <CartCard
              key={item.id}
              product={item.product}
              toggleSelectedItem={toggleSelectedItem}
              removeItemFromCartList={removeItemFromCartList}
              isSelected={isSelected}
            />
          ))}
        </Style.List>
        <Style.Select>
          <Checkbox onChange={toggleAllItem} checked={isAllSelected()} />
          <div>{`전체선택 (${selectedItemIds.length}/${cartList.length})`}</div>
          <Style.DeleteButton onClick={deleteSelectedItems}>선택삭제</Style.DeleteButton>
        </Style.Select>
      </Style.ListContainer>
      <TotalPrice price={totalPrice} />
    </Style.Container>
  );
};

const Style = {
  Container: styled.div`
    display: flex;

    @media screen and (max-width: 1320px) {
      flex-direction: column;
      align-items: center;
    }
  `,

  ListContainer: styled.div`
    @media screen and (max-width: 1320px) {
      width: 100%;
    }
  `,

  List: styled.ul`
    li {
      &:last-child {
        border-bottom: none;
      }
    }
  `,

  CartAmount: styled.div`
    text-align: left;
    padding: 30px 0 20px 0;

    font-size: 24px;
    border-bottom: 4px solid #aaaaaa;
    @media screen and (max-width: 1320px) {
      padding: 30px 0 20px 15px;
    }
  `,

  CheckBox: styled.input`
    width: 28px;
    height: 28px;

    cursor: pointer;
    appearance: auto;
    background-repeat: no-repeat;
  `,

  Select: styled.div`
    display: flex;
    align-items: center;
    gap: 10px;

    font-size: 20px;

    @media screen and (max-width: 1320px) {
      margin-left: 20px;
    }
  `,

  DeleteButton: styled.div`
    display: flex;
    text-align: center;
    align-items: center;
    justify-content: center;

    width: 98px;
    height: 35px;
    margin-left: 20px;

    font-size: 17px;
    border: 1px solid #dddddd;
    border-radius: 3px;

    cursor: pointer;
  `,
};

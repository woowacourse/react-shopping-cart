import styled from "styled-components";
import { Product } from "../../types/Product";
import { Counter } from "./Counter";
import { useCartItem } from "../../hooks/useCartItem";
import { useRef } from "react";
import { DeleteShoppingCartIcon } from "../../assets/ShoppingCartIcons";
import { deleteCartItem } from "../../utils/apis";

interface CartCardProps {
  product: Product;
  toggleSelectedItem?: (id: number) => void;
  isSelected: (id: number) => boolean;
}

export const CartCard = ({ product, toggleSelectedItem, isSelected }: CartCardProps) => {
  const { id, name, imageUrl, price } = product;

  const { removeItemFromCartList, changeCartItemQuantity, quantity } = useCartItem(id);
  const handleSelectBoxChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (toggleSelectedItem) toggleSelectedItem(id);
  };

  return (
    <Style.Container>
      <Style.ContentsOnReft>
        <Style.CheckBox type="checkbox" onChange={handleSelectBoxChanged} checked={isSelected(id)} />
        <Style.Image src={imageUrl} alt={`${name}`} />
        <Style.Name>{name}</Style.Name>
      </Style.ContentsOnReft>
      <Style.ContentsOnRight>
        <DeleteShoppingCartIcon handleClick={removeItemFromCartList} />
        <Style.Button>
          <Counter quantity={quantity} min={1} handleValueChanged={changeCartItemQuantity} />
        </Style.Button>
        <Style.Price>{isSelected(id) ? price * quantity : 0}원</Style.Price>
      </Style.ContentsOnRight>
    </Style.Container>
  );
};

const Style = {
  Container: styled.li`
    width: 735px;
    height: 190px;

    display: flex;
    justify-content: space-between;

    padding: 20px 0;
    gap: 18px;

    border-bottom: 2px solid #cccccc;
  `,

  Image: styled.img`
    width: 144px;
    height: 147px;
  `,

  ContentsOnReft: styled.div`
    width: 550px;

    display: flex;
    gap: 15px;
  `,

  ContentsOnRight: styled.div`
    display: flex;
    flex-direction: column;
    align-items: end;

    gap: 40px;
  `,

  Name: styled.span`
    font-size: 21px;
    line-height: 30px;

    width: 350px;
  `,

  Price: styled.span`
    font-size: 20px;
  `,

  CheckBox: styled.input`
    width: 28px;
    height: 28px;

    cursor: pointer;
    appearance: auto;
  `,

  Button: styled.div`
    transform: scale(1.7) translate(-20%, 0);
  `,
};

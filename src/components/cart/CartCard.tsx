import styled from "styled-components";
import { Product } from "../../types/Product";
import { Counter } from "../product/Counter";
import { useCartItem } from "../../hooks/useCartItem";
import { DeleteShoppingCartIcon } from "../../assets/ShoppingCartIcons";
import { Checkbox } from "../common/Checkbox";

interface CartCardProps {
  product: Product;
  toggleSelectedItem?: (id: number) => void;
  isSelected: (id: number) => boolean;
  removeItemFromCartList: (id: number) => void;
}

export const CartCard = ({ product, toggleSelectedItem, isSelected, removeItemFromCartList }: CartCardProps) => {
  const { id, name, imageUrl, price } = product;

  const { changeCartItemQuantity, quantity } = useCartItem(id);
  const handleSelectBoxChanged = () => {
    if (toggleSelectedItem) toggleSelectedItem(id);
  };

  const handleDelete = () => {
    removeItemFromCartList(id);
  };

  return (
    <Style.Container>
      <Style.ContentsOnReft>
        <Checkbox onChange={handleSelectBoxChanged} checked={isSelected(id)} />
        <Style.Image src={imageUrl} alt={`${name}`} />
        <Style.NameContainer>
          <Style.Name>{name}</Style.Name>
          <Style.PriceUnderName>{isSelected(id) ? price * quantity : 0}원</Style.PriceUnderName>
        </Style.NameContainer>
      </Style.ContentsOnReft>
      <Style.ContentsOnRight>
        <Style.DeleteButton>
          <DeleteShoppingCartIcon handleClick={handleDelete} />
        </Style.DeleteButton>
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
    display: flex;
    justify-content: space-between;
    flex-wrap: nowrap;

    height: 190px;
    padding: 20px 0;
    gap: 18px;

    border-bottom: 2px solid #cccccc;
    z-index: 99;

    @media screen and (max-width: 1320px) {
      padding: 30px 20px;
      height: 210px;
    }

    @media screen and (max-width: 700px) {
      height: 210px;
    }
  `,

  Image: styled.img`
    width: 144px;
    height: 147px;

    @media screen and (max-width: 700px) {
      width: 100px;
      height: 100px;
    }
  `,

  ContentsOnReft: styled.div`
    display: flex;
    gap: 15px;
  `,

  ContentsOnRight: styled.div`
    display: flex;
    flex-direction: column;
    align-items: end;

    gap: 30px;

    @media screen and (max-width: 700px) {
      justify-content: space-between;
    }
  `,

  Name: styled.span`
    font-size: 21px;
    line-height: 30px;

    width: 350px;

    @media screen and (max-width: 700px) {
      width: 150px;

      font-size: 17px;
    }
  `,

  NameContainer: styled.div`
    display: flex;
    flex-direction: column;
  `,

  Price: styled.span`
    font-size: 20px;

    @media screen and (max-width: 700px) {
      display: none;
      font-size: 16px;
    }
  `,

  PriceUnderName: styled.div`
    font-size: 20px;
    margin-top: 10px;
    display: none;

    @media screen and (max-width: 700px) {
      display: flow;
    }
  `,

  CheckBox: styled.input`
    width: 28px;
    height: 28px;

    cursor: pointer;
    appearance: auto;

    @media screen and (max-width: 700px) {
      width: 20px;
      height: 20px;
    }
  `,

  DeleteButton: styled.div`
    top: 25px;
    right: 20px;
  `,

  Button: styled.div`
    transform: scale(1.7) translate(-20%, 0);
    @media screen and (max-width: 700px) {
      transform: scale(1.3) translate(-20%, 0);
    }
  `,
};

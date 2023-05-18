import styled from "styled-components";
import { Product } from "../../types/Product";
import { Counter } from "./Counter";
import { AddShoppingCartIcon } from "../../assets/ShoppingCartIcons";
import { useCartList } from "../../hooks/useCartList";

export const ProductCard = ({ id, name, price, imageUrl }: Product) => {
  const { cartList, addProductToCartList, removeProductFromCartList } = useCartList(id);

  return (
    <Style.Container>
      <Style.Image src={imageUrl} alt={`${name}`} />
      <Style.DescriptionContainer>
        <Style.NamePriceContainer>
          <Style.Name>{name}</Style.Name>
          <Style.Price>{price}원</Style.Price>
        </Style.NamePriceContainer>
        {cartList.includes(id) ? (
          <Counter removeItemFromCartList={removeProductFromCartList} />
        ) : (
          <AddShoppingCartIcon handleClick={addProductToCartList} />
        )}
      </Style.DescriptionContainer>
    </Style.Container>
  );
};

const Style = {
  Container: styled.li`
    width: 283px;
    height: 358px;

    display: flex;
    flex-direction: column;
    gap: 18px;
  `,
  Image: styled.img`
    width: 283px;
    height: 283px;
  `,
  DescriptionContainer: styled.div`
    width: 283px;

    display: flex;
    justify-content: space-between;
  `,
  NamePriceContainer: styled.div`
    display: flex;
    flex-direction: column;

    width: 201px;
    gap: 10px;
  `,
  Name: styled.span`
    font-size: 16px;
  `,
  Price: styled.span`
    font-size: 20px;
  `,
};

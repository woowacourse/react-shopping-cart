import styled from "styled-components";
import { Product } from "../../types/Product";
import { CardButton } from "./CardButton";

export const ProductCard = ({ id, name, price, imageUrl }: Product) => {
  return (
    <Style.Container>
      <Style.Image src={imageUrl} alt={`${name}`} />
      <Style.DescriptionContainer>
        <Style.NamePriceContainer>
          <Style.Name>{name}</Style.Name>
          <Style.Price>{price}원</Style.Price>
        </Style.NamePriceContainer>
        <CardButton id={id} />
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

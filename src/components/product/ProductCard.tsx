import styled from "styled-components";
import { Product } from "../../types/Product";
import { CardButton } from "./CardButton";
import { Suspense } from "react";

export const ProductCard = ({ id, name, price, imageUrl }: Product) => {
  return (
    <Style.Container>
      <Style.Image src={imageUrl} alt={`${name}`} />
      <Style.DescriptionContainer>
        <Style.NamePriceContainer>
          <Style.Name>{name}</Style.Name>
          <Style.Price>{price}원</Style.Price>
        </Style.NamePriceContainer>
        <Suspense fallback={<h1>로딩중....</h1>}>
          <CardButton id={id} />
        </Suspense>
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

    @media screen and (max-width: 700px) {
      width: 150px;
      height: 200px;
    }
  `,

  Image: styled.img`
    width: 283px;
    height: 283px;

    @media screen and (max-width: 700px) {
      width: 150px;
      height: 150px;
    }
  `,
  DescriptionContainer: styled.div`
    width: 283px;

    display: flex;
    justify-content: space-between;
    @media screen and (max-width: 700px) {
      width: 150px;
      flex-direction: column-reverse;
    }
  `,

  NamePriceContainer: styled.div`
    display: flex;
    flex-direction: column;

    width: 201px;
    gap: 10px;

    justify-content: space-between;
    @media screen and (max-width: 700px) {
      margin-top: 15px;
      width: 150px;
    }
  `,

  Name: styled.span`
    font-size: 16px;
  `,

  Price: styled.span`
    font-size: 20px;
  `,
};

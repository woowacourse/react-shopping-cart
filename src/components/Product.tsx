import React from "react";

import styled from "styled-components";

interface ProductProps {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}

export default function Product({ id, name, price, imageUrl }: ProductProps) {
  return (
    <$Wrapper>
      <$Img src={`./assets/${imageUrl}`} />
      <$InfoBox>
        <$LabelBox>
          <$Name>{name}</$Name>
          <$Price>{price} 원</$Price>
        </$LabelBox>
        <$ControlBox>
          {/* <$CartIcon src="./assets/cart.svg"></$CartIcon> */}
          <$Counter type="number" min={1} value={1} />
        </$ControlBox>
      </$InfoBox>
    </$Wrapper>
  );
}

const $Wrapper = styled.div`
  width: 282px;
  height: 362px;

  color: #333333;
`;

const $Img = styled.img`
  width: 100%;
  height: 282px;
`;

const $InfoBox = styled.div`
  display: flex;
  justify-content: space-between;

  width: 282px;

  padding-top: 18px;
  padding-left: 18px;
`;

const $LabelBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const $Name = styled.p`
  margin-top: 4px;

  font-size: 16px;
  font-weight: 400;
`;

const $Price = styled.p`
  margin-top: 10px;

  vertical-align: center;
  font-size: 20px;
  font-weight: 400;
`;

const $CartIcon = styled.img`
  width: 24px;
  height: 22px;
  margin-right: 10px;
`;

const $ControlBox = styled.div`
  width: auto;
`;

const $Counter = styled.input`
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

import styled from "styled-components";

export const CartTitle = styled.div`
  font-style: normal;
  font-weight: 700;
  font-size: 32px;
  line-height: 37px;

  text-align: center;
  letter-spacing: 0.5px;

  margin: 60px 0px 30px 0px;
`;

export const FatBorder = styled.hr`
  border: solid 4px black;
`;

export const CartWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0 -15px;
`;

export const EmptyCartWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 700px;
`;

export const EmptyCartTitle = styled.div`
  font-size: 20rem;
  font-weight: bold;
  text-align: center;
`;

export const EmptyCartDescription = styled.div`
  font-size: 2rem;
  text-align: center;
`;

export const EmptyCartButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px 0px 20px 0px;
`;

export const EmptyCartButton = styled.button`
  text-align: center;
  border: 1px gray solid;
  border-radius: 5px;
  padding: 5px;
`;

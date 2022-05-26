import styled from "styled-components";

const CartItemWrapper = styled.div`
  display: flex;
  padding: 16px 0;
  border-bottom: 1px solid #cccccc;
  width: 100%;
`;

const CartItemImage = styled.img`
  width: 100px;
  margin: 0 12px;
`;

const CartItemName = styled.div`
  width: 100%;
`;

const DeleteIcon = styled.img`
  width: 16px;
  cursor: pointer;
`;

const CartItemInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
  justify-content: space-between;
`;

const CartCounter = styled.div`
  display: grid;
  grid-template-columns: 50px 30px;
  grid-template-rows: repeat(2, 20px);
  width: 80px;
  height: 40px;
  border: 1px solid #dddddd;
`;

const CartCounterNumber = styled.div`
  grid-column: 1/2;
  grid-row: 1/-1;
  display: flex;
  justify-content: center;
  align-items: center;
  border-right: 1px solid #dddddd;
  font-size: 18px;
`;

const CartCounterIncreaseButton = styled.div`
  grid-column: 2/-1;
  grid-row: 1/2;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #dddddd;
  font-size: 10px;
  cursor: pointer;
`;

const CartCounterDecreaseButton = styled.div`
  grid-column: 2/-1;
  grid-row: 2/-1;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 10px;
  cursor: pointer;
`;

const EmptyCart = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 28px;
`;

const CartItemListWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export {
  CartItemWrapper,
  CartItemImage,
  CartItemName,
  DeleteIcon,
  CartItemInfoWrapper,
  CartCounterDecreaseButton,
  CartCounterIncreaseButton,
  CartCounter,
  CartCounterNumber,
  EmptyCart,
  CartItemListWrapper,
};

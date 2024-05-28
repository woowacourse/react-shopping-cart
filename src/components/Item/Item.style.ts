import styled from "styled-components";

const ItemHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 24px;
  margin-top: 12px;
`;

const ItemBody = styled.div`
  height: 112px;
  margin-top: 12px;
  display: flex;
  align-items: center;
`;

const ItemWrapper = styled.div`
  height: 160px;
  border-top: 1px solid ${({ theme }) => theme.COLOR["grey"]};
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;

const ItemImageBox = styled.div<{ $path: string }>`
  width: 112px;
  height: 112px;

  border-radius: 10px;
  background-size: cover;
  background-repeat: no-repeat;
  background-image: url(${({ $path }) => $path});
`;

const ItemPriceTagWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const ItemQuantityUpdateButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const ItemDetailWrapper = styled.div`
  height: 93px;
  width: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  margin-left: 30px;
`;

const ItemQuantity = styled.span`
  width: 25px;
  height: 15px;
  font-size: 12px;
  line-height: 15px;
  font-weight: 500;

  text-align: center;
`;

const Styled = {
  ItemWrapper,
  ItemHeader,
  ItemBody,
  ItemImageBox,
  ItemPriceTagWrapper,
  ItemDetailWrapper,
  ItemQuantityUpdateButtonWrapper,
  ItemQuantity,
};

export default Styled;

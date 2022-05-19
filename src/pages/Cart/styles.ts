import styled from "styled-components";

const CartPageContainer = styled.div`
  margin: 0 180px;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 50px;
  margin: 0 10px;
`;

const SelectAllContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 30px 0;

  div {
    display: flex;
    align-items: center;
  }

  span {
    margin-left: 10px;
  }

  button {
    color: black;
    background-color: ${({ theme }) => theme.colors.WHITE};
    border: 1px solid ${({ theme }) => theme.colors.GRAY_400};
  }
`;

const CartListTitle = styled.div`
  border-bottom: 2px solid ${({ theme }) => theme.colors.GRAY_400};
  padding-bottom: 10px;
`;

const PaymentContainer = styled.div`
  margin-top: 80px;
  height: 200px;
`;

const PaymentTitleWrapper = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.GRAY_300};
  padding: 15px;
`;

const PaymentResultContainer = styled.div`
  display: flex;
  border: 1px solid ${({ theme }) => theme.colors.GRAY_300};
  flex-direction: column;
  justify-content: space-between;
  height: 100px;
  padding: 15px;

  div {
    display: flex;
    justify-content: space-between;
  }

  span {
    background: linear-gradient(to top, #99f6e4 50%, white 50%);
  }
`;

export {
  GridContainer,
  SelectAllContainer,
  CartListTitle,
  PaymentContainer,
  PaymentTitleWrapper,
  PaymentResultContainer,
  CartPageContainer,
};

import styled from "styled-components";

const OrderBoxWrapper = styled.div`
  width: 80%;
  height: 200px;
  border: 1px solid #dddddd;
`;

const OrderBoxTitle = styled.div`
  border-bottom: 2px solid #dddddd;
  height: 25%;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
`;

const OrderBoxDetail = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 25%;
  padding: 0 20px;
  box-sizing: border-box;

  span {
    font-weight: 700;
    font-size: 14px;
    background-image: linear-gradient(transparent 70%, rgba(42, 193, 188, 0.5) 40%);
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50%;
  width: 100%;
`;

const OrderButton = styled.button`
  width: 90%;
  background-color: #2ac1bc;
  font-size: 18px;
  color: white;
  border: none;
  height: 50px;
  cursor: pointer;
`;

export { OrderBoxWrapper, OrderBoxTitle, OrderBoxDetail, ButtonWrapper, OrderButton };

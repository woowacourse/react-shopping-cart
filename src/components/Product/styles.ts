import styled from "styled-components";

const ProductWrapper = styled.div`
  width: 280px;
  height: 360px;

  display: flex;
  flex-direction: column;

  & img {
    width: 100%;
    height: 280px;
    cursor: pointer;
  }
`;

const ProductInfoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  height: 100%;

  & img {
    width: 30px;
    height: 26px;
    cursor: pointer;
  }
`;

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;

  &:hover {
    text-decoration: underline;
  }

  &:first-child {
    font-size: 16px;
    cursor: pointer;
  }

  & span + span {
    margin-top: 5px;
    font-size: 20px;
    cursor: pointer;
  }
`;

export { ProductWrapper, ProductInfoWrapper, ProductInfo };

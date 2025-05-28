import styled from "@emotion/styled";

export const Container = styled.header`
  background-color: #000000;
  min-width: 430px;
  height: 64px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 24px;
  padding-right: 24px;
  position: fixed;
  z-index: 100;

  a {
    text-decoration: none;
  }
`;

export const Title = styled.p`
  font-weight: 800;
  font-size: 20px;
  color: #ffffff;
`;

export const ButtonWrapper = styled.div`
  position: relative;
`;

export const Button = styled.button`
  height: 24px;
  padding: 0;
  border: 0;
  background-color: transparent;
  cursor: pointer;
  line-height: 1;
`;

export const Image = styled.img`
  width: 24px;
  height: 100%;
`;

export const ShoppingBag = styled.div`
  width: 18px;
  height: 18px;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: #ffffff;
  color: #000000;
  position: absolute;
  right: 0;
  bottom: 0;

  border-radius: 50%;

  font-size: 10px;
  font-weight: 700;

  cursor: pointer;
`;

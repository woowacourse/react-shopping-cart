import styled from "styled-components";

export const TitleContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;

  width: 380px;
  color: ${({ theme }) => theme.main};
  cursor: pointer;
`;

export const IconImg = styled.img`
  width: 50px;
  height: 44px;
`;

export const PageTitle = styled.h1`
  font-size: 40px;
  font-weight: 900;
`;

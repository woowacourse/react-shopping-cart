import styled from "styled-components";

export const TitleContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;

  width: 380px;
  color: ${({ theme: { color } }) => color.main};
  cursor: pointer;
`;

export const IconImg = styled.img`
  width: 50px;
  height: 44px;
`;

export const PageTitle = styled.h1`
  font-size: ${({ theme: { fontSize } }) => fontSize.veryLarge};
  font-weight: 900;
`;

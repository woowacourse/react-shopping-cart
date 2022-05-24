import styled from "styled-components";

const StyledLogoContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;

  width: 380px;
  color: ${({ theme }) => theme.color.white};
  cursor: pointer;
`;

const StyledIconImg = styled.img`
  width: 50px;
  height: 44px;
`;

const StyledTitle = styled.h1`
  font-size: 40px;
  font-weight: 900;
`;

export { StyledLogoContainer, StyledIconImg, StyledTitle };

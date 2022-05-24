import styled from "styled-components";

const StyledContainer = styled.section`
  width: 400px;
`;

const StyledTopSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  border-bottom: 1px solid ${({ theme }) => theme.color.grey_darker};
  padding: 16px;
`;

const StyledBottomSection = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 16px 16px 20px;
`;

const StyledProductImg = styled.img`
  width: 100%;
  object-fit: cover;
`;

const StyledProductName = styled.p`
  font-size: 1.25rem;
  font-weight: 700;
  color: ${({ theme }) => theme.color.grey_darker};
  padding: 8px 0;
`;

const StyledProductPriceText = styled.span`
  font-size: 1rem;
  color: ${({ theme }) => theme.color.grey_darker};
  margin: auto 0;
`;

const StyledProductPrice = styled.p`
  font-size: 1.25rem;
  color: ${({ theme }) => theme.color.grey_darker};
`;

export {
  StyledContainer,
  StyledTopSection,
  StyledBottomSection,
  StyledProductImg,
  StyledProductName,
  StyledProductPriceText,
  StyledProductPrice,
};

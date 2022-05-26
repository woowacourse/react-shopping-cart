import styled from "styled-components";

const Container = styled.section`
  width: 400px;
`;

const TopSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  border-bottom: 1px solid ${({ theme }) => theme.color.grey_darker};
  padding: 16px;
`;

const BottomSection = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 16px 16px 20px;
`;

const ProductImg = styled.img`
  width: 100%;
  object-fit: cover;
`;

const ProductName = styled.p`
  font-size: 1.25rem;
  font-weight: 700;
  color: ${({ theme }) => theme.color.grey_darker};
  padding: 8px 0;
`;

const ProductPriceText = styled.span`
  font-size: 1rem;
  color: ${({ theme }) => theme.color.grey_darker};
  margin: auto 0;
`;

const ProductPrice = styled.p`
  font-size: 1.25rem;
  color: ${({ theme }) => theme.color.grey_darker};
`;

export {
  Container,
  TopSection,
  BottomSection,
  ProductImg,
  ProductName,
  ProductPriceText,
  ProductPrice,
};

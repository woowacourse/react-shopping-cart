import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  margin-top: 1.2rem;
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 1.2rem 0;
`;

export const Contents = styled.div`
  display: flex;
  gap: 2.4rem;
`;

export const ProductImage = styled.img`
  width: 11.2rem;
  height: 11.2rem;
  object-fit: cover;
  border-radius: 0.8rem;
`;

export const ProductDescription = styled.div`
  padding: 0.95rem 0;
`;

export const ProductName = styled.p`
  ${props => props.theme.typography.label};
`;

export const ProductPrice = styled.p`
  margin-bottom: 2rem;
  ${props => props.theme.typography.pageTitle};
`;

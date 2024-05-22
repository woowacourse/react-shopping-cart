import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
`;

export const Hr = styled.hr`
  width: 100%;
  height: 0.1rem;
  margin-bottom: 1.2rem;
  border: 0.1rem solid ${props => props.theme.color.black10};
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

export const ProductQuantity = styled.p`
  margin-bottom: 2rem;
  ${props => props.theme.typography.label};
`;

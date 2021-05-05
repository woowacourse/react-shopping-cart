import styled from '@emotion/styled';

const Container = styled.div`
  height: 140px;
  width: inherit;
  display: flex;
`;

const Image = styled.img`
  width: 140px;
  height: 140px;
  object-fit: cover;
`;

const ProductContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-left: 33px;
`;

const Name = styled.div`
  margin-bottom: 25px;
  font-size: 1.2rem;
  color: #333333;
`;

const ProductDetail = styled.div`
  color: #333333;
  font-size: 1rem;
`;

export { Container, Image, ProductContainer, ProductDetail, Name };

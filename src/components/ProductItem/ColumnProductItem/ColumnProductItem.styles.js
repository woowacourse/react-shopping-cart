import styled from '@emotion/styled';

const Container = styled.div`
  max-height: 500px;
  width: 280px;
`;
const Image = styled.img`
  width: 100%;
  object-fit: cover;
`;

const DetailContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ProductDetail = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 12px;
`;

const Name = styled.div`
  word-break: keep-all;
`;

const Price = styled.div`
  font-size: 1.2rem;
`;

export { Container, Image, DetailContainer, ProductDetail, Name, Price };

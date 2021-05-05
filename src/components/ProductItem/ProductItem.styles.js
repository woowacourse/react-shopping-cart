import styled from '@emotion/styled';

const Container = styled.div`
  width: 280px;
  height: 360px;
`;
const Image = styled.img`
  width: 100%;
  object-fit: cover;
`;

const BottomContainer = styled.div`
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
const Name = styled.div``;
const Price = styled.div`
  font-size: 1.2rem;
`;

export { Container, Image, BottomContainer, ProductDetail, Name, Price };

import styled from '@emotion/styled';

const Container = styled.div`
  max-height: 360px;
  width: 280px;
  margin-bottom: 50px;
`;

const ImageContainer = styled.div`
  position: relative;
  width: 28rem;
  height: 28rem;
  overflow: hidden;
  cursor: pointer;

  &:after {
    content: '';
    width: 28rem;
    height: 28rem;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;
    background-color: rgba(0, 0, 0, 0.03);
  }
`;

const Image = styled.img`
  width: 28rem;
  height: 28rem;
  object-fit: contain;
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
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const Price = styled.div`
  font-size: 2rem;
`;

export { Container, ImageContainer, Image, DetailContainer, ProductDetail, Name, Price };

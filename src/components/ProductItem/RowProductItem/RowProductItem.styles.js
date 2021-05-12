import styled from '@emotion/styled';

const Container = styled.div`
  min-height: 140px;
  width: inherit;
  display: flex;

  @media screen and (max-width: 376px) {
    flex-direction: column;
  }
`;

const ImageContainer = styled.div`
  position: relative;
  width: 140px;
  height: 140px;
  overflow: hidden;
  cursor: pointer;

  &:after {
    content: '';
    width: 140px;
    height: 140px;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;
    background-color: rgba(0, 0, 0, 0.03);
  }
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
  margin-left: 3.2rem;

  @media screen and (max-width: 376px) {
    margin-left: 0;
    margin-top: 3.2rem;
  }
`;

const Name = styled.div`
  max-width: 400px;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 25px;
  font-size: 2rem;
  color: #333333;
`;

const ProductDetail = styled.div`
  color: #888888;
  font-size: 1.6rem;
`;

export { Container, ImageContainer, Image, ProductContainer, ProductDetail, Name };

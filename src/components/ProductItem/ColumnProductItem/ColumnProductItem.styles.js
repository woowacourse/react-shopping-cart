import styled from '@emotion/styled';
import { IMAGE_SIZE } from '../../../constants';

const IMAGE_SIZE_TABLE = {
  [IMAGE_SIZE.SM]: '14rem',
  [IMAGE_SIZE.MD]: '28rem',
};

const Container = styled.div`
  max-height: 360px;
  width: ${({ imageSize }) => IMAGE_SIZE_TABLE[imageSize]};
  margin-bottom: 50px;
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
  cursor: pointer;

  &:after {
    content: '';
    width: ${({ imageSize }) => IMAGE_SIZE_TABLE[imageSize]};
    height: ${({ imageSize }) => IMAGE_SIZE_TABLE[imageSize]};
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;
    background-color: rgba(0, 0, 0, 0.03);
  }
`;

const Image = styled.img`
  width: ${({ imageSize }) => IMAGE_SIZE_TABLE[imageSize]};
  height: ${({ imageSize }) => IMAGE_SIZE_TABLE[imageSize]};
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

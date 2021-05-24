import styled from '@emotion/styled';

const Root = styled.div`
  width: 282px;
  cursor: pointer;
`;

const ImageWrapper = styled.div`
  height: 282px;
  width: 282px;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Content = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
`;

const Detail = styled.div`
  letter-spacing: 0.5px;
  max-width: 200px;
`;

const Title = styled.div`
  font-size: 16px;
  line-height: 22px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Price = styled.div`
  font-size: 20px;
  line-height: 27px;

  &::after {
    content: ' 원';
  }
`;

const CartButton = styled.button`
  padding: 0.4em;
  border: none;
  background: none;
  cursor: pointer;

  &:hover {
    transform: scale(1.2);
  }
`;

export default { Root, ImageWrapper, Image, Content, Detail, Title, Price, CartButton };

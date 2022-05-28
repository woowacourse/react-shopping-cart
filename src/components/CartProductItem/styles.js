import styled from '@emotion/styled';
import { FlexWrapper } from 'components/@common/CommonStyle/styles';

const Container = styled(FlexWrapper)`
  margin: 0;
  align-items: flex-start;
`;

const ImageWrapper = styled.div`
  cursor: pointer;
  position: relative;
  width: 25%;
  height: 100%;
  margin: 0;
  overflow: hidden;

  & > img {
    position: absolute;
    width: 100%;
    height: 100%;

    left: 0px;
    top: 0px;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  &::after {
    content: '';
    display: block;
    padding-bottom: 100%;
  }

  &:hover > img {
    transform: scale(110%);
  }
`;

const Info = styled.div`
  width: 100%;
  padding: 0%;

  & > p {
    width: 100%;
    margin: 0 auto;
    font-size: 1.16rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const Title = styled.p`
  font-weight: bold;
  font-size: 0.9rem;
  padding: 0.5rem 0;
`;

export { Container, ImageWrapper, Info, Title };

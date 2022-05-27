import styled from '@emotion/styled';

const ImageWrapper = styled.div`
  cursor: pointer;

  position: relative;
  width: 90%;
  margin: 0 auto;
  overflow: hidden;
  margin-bottom: 1rem;

  &::after {
    content: '';
    display: block;
    padding-bottom: 100%;
  }

  & > img {
    position: absolute;
    width: 100%;
    height: 100%;

    left: 0px;
    top: 0px;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  &:hover > img {
    transform: scale(110%);
  }
`;

const Description = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  width: 100%;
`;

const Info = styled.div`
  width: 100%;
  padding: 0%;

  & > p {
    width: 90%;
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

export { ImageWrapper, Description, Info, Title };

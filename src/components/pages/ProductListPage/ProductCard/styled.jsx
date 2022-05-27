import styled from "styled-components";

export const CardContainer = styled.li`
  display: flex;
  flex-direction: column;
  width: 280px;
  height: 360px;
  border: 1px solid ${({ theme: { color } }) => color.gray03};

  cursor: pointer;

  :hover {
    box-shadow: 0 0 10px 0 ${({ theme: { color } }) => color.gray02};
  }
`;

export const ImageWrapper = styled.div`
  width: 100%;
  height: 278px;

  overflow: hidden;
`;

export const ProductThumbnail = styled.div`
  width: 100%;
  height: 100%;

  background-position: center center;
  background-repeat: no-repeat;
  background-image: url(${({ bgImage }) => bgImage});
  transition: transform 0.3s;
  background-size: cover;

  :hover {
    transform: scale(1.1);
  }
`;

export const CardBottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  flex-grow: 1;
  padding: 0 12px;
`;

export const InfoWrapper = styled.div`
  max-width: 70%;
`;

export const ProductName = styled.p`
  font-size: ${({ theme: { fontSize } }) => fontSize.small};
  color: ${({ theme: { color } }) => color.gray01};
  padding: 2px 0;

  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const ProductPrice = styled.p`
  font-size: ${({ theme: { fontSize } }) => fontSize.medium};
  color: ${({ theme: { color } }) => color.gray01};
`;

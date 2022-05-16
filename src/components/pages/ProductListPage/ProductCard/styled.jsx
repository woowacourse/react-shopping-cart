import styled from "styled-components";

export const CardContainer = styled.li`
  display: flex;
  flex-direction: column;
  width: 280px;
  height: 360px;
  border: 1px solid #ddd;

  cursor: pointer;
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
  object-fit: cover;

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
  font-size: 1rem;
  color: ${({ theme }) => theme.textDefault};
  padding: 2px 0;

  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const ProductPrice = styled.p`
  font-size: 1.25rem;
  color: ${({ theme }) => theme.textDefault};
`;

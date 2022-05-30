import styled from 'styled-components';

export const PageBox = styled.div`
  width: 570px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

export const Title = styled.h2`
  font-size: 2rem;
  font-weight: 500;
  line-height: 2.7rem;
`;

export const ImageBox = styled.div`
  aspect-ratio: 1 / 1;
  overflow: hidden;
  width: 100%;

  img {
    width: 100%;
  }
`;

export const EmptyImageBox = styled.div`
  background: ${({ theme: { colors } }) => colors.gray};
  color: ${({ theme: { colors } }) => colors.white};
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  font-weight: 700;
`;

export const DescriptionList = styled.dl`
  width: 100%;
  display: flex;
  justify-content: space-between;
  font-size: 1.2rem;
`;

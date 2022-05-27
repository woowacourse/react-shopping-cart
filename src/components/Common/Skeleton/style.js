import styled, { css, keyframes } from 'styled-components';

export const skeletonSize = {
  large: css`
    width: 380px;
    height: 350px;
  `,
  small: css`
    width: 200px;
    height: 200px;
  `,
};

const refresh = keyframes`
0% { background-position: calc(-100px); }
40%,
100% { background-position: 280px; }
`;

const skeletonStyle = css`
  background-image: linear-gradient(
    90deg,
    #e0e0e0 0px,
    #ededed 30px,
    #e0e0e0 60px
  );
  animation: ${refresh} 2s infinite ease-out;
`;

export const Wrapper = styled.div`
  ${({ sizeType }) => `
    ${skeletonSize[sizeType]}
  `}
  margin-bottom: 30px;
`;

export const LargeBox = styled.div`
  max-width: 100%;
  height: 100%;
  ${skeletonStyle}
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;
  margin-top: 8px;
  width: 100%;
`;

export const MediumBox = styled.div`
  width: 180px;
  height: 18px;
  ${skeletonStyle}
`;

export const SmallBox = styled.div`
  width: 147px;
  height: 18px;
  ${skeletonStyle}
`;

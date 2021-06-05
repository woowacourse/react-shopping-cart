import styled from 'styled-components';

export const DetailWrapper = styled.div`
  h3 {
    text-align: center;
    margin-bottom: 1rem;
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 3.325rem 0;
`;

export const RecommendedItems = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--color-background);
  padding: 1.5rem 0;
  position: relative;
`;

export const RandomProduct = styled.div`
  max-width: 75rem;
  overflow-x: hidden;
  position: relative;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 1rem;
`;

export const Wrapper = styled.div`
  max-width: 8rem;
`;

const Button = styled.button`
  width: 5rem;
  z-index: 1;
  position: absolute;
  top: -1;
  height: 100%;
`;

export const LeftButton = styled(Button)`
  left: 0;
  background: linear-gradient(
    90deg,
    rgba(125, 125, 125, 0.7) 0%,
    rgba(150, 150, 150, 0.5) 35%,
    rgba(209, 209, 209, 0.3) 75%,
    rgba(255, 255, 255, 0) 100%
  );

  :hover {
    background: linear-gradient(
      90deg,
      rgba(89, 218, 206, 0.4) 0%,
      rgba(176, 255, 238, 0.5) 35%,
      rgba(183, 251, 242, 0.3) 75%,
      rgba(255, 255, 255, 0) 100%
    );
  }
`;

export const RightButton = styled(Button)`
  right: 0;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(209, 209, 209, 0.3) 35%,
    rgba(150, 150, 150, 0.5) 75%,
    rgba(125, 125, 125, 0.7) 100%
  );

  :hover {
    background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0) 0%,
      rgba(183, 251, 242, 0.3) 35%,
      rgba(176, 255, 238, 0.5) 75%,
      rgba(89, 218, 206, 0.4) 100%
    );
  }
`;

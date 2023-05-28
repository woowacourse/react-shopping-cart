import { styled } from 'styled-components';

const StyledSkeleton = styled.div`
  background: linear-gradient(-90deg, #aaa, #f0f0f0, #aaa, #f0f0f0);
  background-size: 400%;
  animation: skeleton-animation 5s infinite ease-out;
  border-radius: 4px;
`;

export const Skeleton = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Image = styled(StyledSkeleton)`
  width: 100%;
  padding-bottom: 100%;
`;

export const Info = styled.div`
  padding-top: 8px;
`;

export const Text = styled(StyledSkeleton)`
  width: 140px;
  height: 20px;

  &:not(:last-child) {
    margin-bottom: 6px;
  }
`;

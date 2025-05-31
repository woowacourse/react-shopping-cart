import styled from '@emotion/styled';

export default function CartListSkeleton() {
  return (
    <SkeletonContainer>
      {Array.from({ length: 3 }).map((_, index) => (
        <SkeletonCard key={index} />
      ))}
    </SkeletonContainer>
  );
}

const SkeletonContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const SkeletonCard = styled.div`
  height: 150px;
  background-color: #e0e0e0;
  border-radius: 8px;
  animation: pulse 1.5s infinite ease-in-out;

  @keyframes pulse {
    0% {
      background-color: #e0e0e0;
    }
    50% {
      background-color: #f5f5f5;
    }
    100% {
      background-color: #e0e0e0;
    }
  }
`;

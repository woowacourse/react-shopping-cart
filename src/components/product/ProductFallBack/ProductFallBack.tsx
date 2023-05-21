import { keyframes, styled } from 'styled-components';

const ProductFallBack = () => {
  return (
    <ProductFallBackContainer>
      {Array.from({ length: 12 }).map((_, i) => (
        <li key={i}>
          <SkeletonItem>
            <SkeletonImage />
            <SkeletonName />
            <SkeletonPrice />
          </SkeletonItem>
        </li>
      ))}
    </ProductFallBackContainer>
  );
};

const ProductFallBackContainer = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(282px, 1fr));
  grid-column-gap: 30px;
  grid-row-gap: 48px;

  place-items: center;

  @media screen and (min-width: 1200px) {
    grid-template-columns: repeat(4, minmax(282px, 1fr));
  }
`;

const skeletonGradient = keyframes`
  0% {
    background-color: rgba(165, 165, 165, 0.3);
  }

  50% {
    background-color: rgba(165, 165, 165, 0.5);
  }

  100% {
    background-color: rgba(165, 165, 165, 0.3);
  }
`;

const SkeletonItem = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 18px;
  width: 282px;
  height: 358px;

  & > * {
    background-color: rgba(0, 0, 0, 0.05);

    animation: ${skeletonGradient} 1.5s infinite ease-in-out;
  }
`;

const SkeletonImage = styled.div`
  width: 282px;
  height: 282px;
`;

const SkeletonName = styled.div`
  width: 141px;
  height: 20px;
`;

const SkeletonPrice = styled.div`
  width: 100px;
  height: 20px;
`;

export default ProductFallBack;

import styled, { keyframes } from 'styled-components';

export default function SkeletonProduct() {
  return (
    <Wrapper>
      <Image />
      <InfoBox>
        <LabelBox>
          <Name />
          <Price />
        </LabelBox>
      </InfoBox>
    </Wrapper>
  );
}

const skeletonBackground = keyframes`
  0%    { background-color: rgba(165, 165, 165, 0.1) }
  50%   { background-color: rgba(165, 165, 165, 0.3) }
  100%  { background-color: rgba(165, 165, 165, 0.1) }
`;

const Wrapper = styled.div`
  width: 282px;
  height: 362px;
`;

const Image = styled.div`
  width: 100%;
  height: 282px;

  animation: ${skeletonBackground} 1s infinite;
`;

const InfoBox = styled.div`
  display: flex;
  justify-content: space-between;

  width: 282px;

  padding-top: 18px;
  padding-left: 18px;
`;

const LabelBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  width: 100%;
`;

const Name = styled.p`
  width: 60%;
  height: 16px;
  margin-top: 4px;

  animation: ${skeletonBackground} 1s infinite;
`;

const Price = styled.p`
  width: 40%;
  height: 20px;
  margin-top: 10px;

  animation: ${skeletonBackground} 0.7s infinite;
`;

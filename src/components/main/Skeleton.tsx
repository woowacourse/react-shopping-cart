import styled, { keyframes } from 'styled-components';

const Skeleton = () => {
  return (
    <S.Wrapper>
      <S.SkeletonThumbnail />
      <S.SkeletonTitle />
      <S.SkeletonPrice />
    </S.Wrapper>
  );
};

const skeletonAnimation = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

const skeleton = styled.div`
  background: linear-gradient(-90deg, #aaa, #f0f0f0, #aaa, #f0f0f0);
  background-size: 400%;
  animation: ${skeletonAnimation} 5s infinite ease-out;
  border-radius: 8px;
  overflow: hidden;
  @media all and (min-width: 768px) and (max-width: 1023px) {
    width: 265px;
  }

  @media all and (min-width: 480px) and (max-width: 767px) {
    width: 275px;
  }

  @media all and (max-width: 479px) {
    width: 286px;
  }
`;

const S = {
  Wrapper: styled.li`
    list-style: none;
  `,
  SkeletonThumbnail: styled(skeleton)`
    width: 270px;
    height: 270px;
    margin-bottom: 20px;

    @media all and (min-width: 768px) and (max-width: 1023px) {
      height: 265px;
    }

    @media all and (min-width: 480px) and (max-width: 767px) {
      height: 275px;
    }

    @media all and (max-width: 479px) {
      height: 286px;
    }
  `,
  SkeletonTitle: styled(skeleton)`
    width: 180px;
    height: 24px;
    margin-bottom: 10px;
    ::after {
      font-size: 0;
      content: 'loading';
    }
  `,
  SkeletonPrice: styled(skeleton)`
    width: 140px;
    height: 24px;
    ::after {
      font-size: 0;
      content: 'loading';
    }
  `,
};

export default Skeleton;

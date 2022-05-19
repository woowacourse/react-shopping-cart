import * as S from "./index.styles";

interface SkeletonProps {
  width: string;
  height: string;
}

const Skeleton = ({ width, height }: SkeletonProps) => {
  return <S.SkeletonContainer width={width} height={height} />;
};

export default Skeleton;

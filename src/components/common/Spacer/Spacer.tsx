import * as S from './Spacer.style';

interface SpacerProp {
  height: number;
}

const Spacer = ({ height }: SpacerProp) => {
  return <S.Spacer height={height} />;
};

export default Spacer;

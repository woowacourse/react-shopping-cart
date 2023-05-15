import * as S from './Spinner.styles';

export interface SpinnerProps {
  timing?: number;
  size?: number;
  width?: number;
}

const Spinner = ({ timing = 1, size = 50, width = 5 }: SpinnerProps) => {
  return <S.Spinner timing={timing} size={size} width={width} />;
};

export default Spinner;

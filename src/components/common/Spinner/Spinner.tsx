import * as S from './Spinner.styles';

export interface SpinnerProps {
  timing?: number;
  size?: number;
  width?: number;
  disabled?: boolean;
}

const Spinner = ({ timing = 1, size = 50, width = 5, disabled = false }: SpinnerProps) => {
  return <S.Spinner timing={timing} size={size} width={width} disabled={disabled} />;
};

export default Spinner;

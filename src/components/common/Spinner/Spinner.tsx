import * as S from './Spinner.styles';

export interface SpinnerProps {
  timing?: number;
  size?: string;
  width?: string;
  disabled?: boolean;
}

const Spinner = ({ timing = 1, size = '50px', width = '5px', disabled = false }: SpinnerProps) => {
  return <S.Spinner timing={timing} size={size} width={width} disabled={disabled} />;
};

export default Spinner;
